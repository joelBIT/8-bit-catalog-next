'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteSessionByTokenValue, getSessionByTokenValue, storeSession, updateSession } from "@/app/_db/sessions-db";
import { Session } from "@/app/_types/types";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { deleteSessionCookie, getValidatedSession } from "./cookie";
import { URL_LOGIN_PAGE } from "@/app/_utils/utils";

const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15; // 15 days
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2;  // 30 days




/**********************************************************************************************
* This file contains functions that creates, updates, and deletes sessions on the server side *
**********************************************************************************************/





/**
 * Creates a random session token which will be used for the cookie and as a one way 
 * hashed version for the actual session's token_value in the database.
 */
export async function generateRandomSessionToken(): Promise<string> {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    return encodeBase32LowerCaseNoPadding(bytes);
}

/**
 * Creates a session for a user when signing in.
 */
export async function createSession(sessionToken: string, user_id: number): Promise<Session> {
    const token_value = fromSessionTokenToSessionValue(sessionToken);

    const session: Session = {
        user_id: user_id,
        expires_at: new Date(Date.now() + SESSION_MAX_DURATION_MS),
        token_value: token_value
    };

    storeSession(session);  // Stores session in database
    return session;
};

function fromSessionTokenToSessionValue(sessionToken: string): string {
    return encodeHexLowerCase(sha256(new TextEncoder().encode(sessionToken)));
};

/**
 * Validates a session based on its token value. If there is a problem the session (if it exists) is deleted. This forces the user to
 * sign in again.
 */
export async function validateSession(sessionToken: string): Promise<Session | undefined> {
    const tokenValue = fromSessionTokenToSessionValue(sessionToken);

    try {
        const result = await getSessionByTokenValue(tokenValue);

        if (result) {
            const { user_id, expires_at, token_value } = result;
    
            const session: Session = {
                user_id: user_id,
                expires_at: expires_at,
                token_value: token_value
            }
      
            // If the session has expired, delete it
            if (Date.now() >= new Date(session.expires_at).getTime()) {
                await deleteSessionByTokenValue(session.token_value);
                return;
            }
        
            // If there are 15 days left until the session expires, refresh the session
            if (Date.now() >= new Date(session.expires_at).getTime() - SESSION_REFRESH_INTERVAL_MS) {
                session.expires_at = new Date(Date.now() + SESSION_MAX_DURATION_MS);
                await updateSession(session);
            }
        
            return session;
        }
    } catch (error) {
        console.log(error);
        await deleteSessionByTokenValue(tokenValue);    // Delete session from database
        await deleteSessionCookie();                    // Delete cookie in browser
    }
}

/**
 * Deletes a session and corresponding cookie when logging out. The user is redirected to the login page
 * and the cache is invalidated so that the header is updated.
 */
export async function signOut(): Promise<void> {
    const session = await getValidatedSession();
      
    if (session) {
        await deleteSessionByTokenValue(session.token_value);       // Delete session from database
        await deleteSessionCookie();                                // Delete cookie in browser
    }

    revalidatePath('/', 'layout');
    redirect(URL_LOGIN_PAGE);
}