'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteSessionByTokenValue, getSessionByTokenValue, storeSession, updateSession } from "@/db/db";
import { Session } from "@/types/types";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { deleteSessionCookie, getValidatedSession } from "./cookie";

const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15; // 15 days
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2;  // 30 days

/**
 * Creates a random session token which will be used for the cookie and as a one way 
 * hashed version for the actual session's token_value in the DB.
 */
export async function generateRandomSessionToken() {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    return encodeBase32LowerCaseNoPadding(bytes);
}

/**
 * Creates a session for a user when signing up/in.
 */
export async function createSession(sessionToken: string, user_id: number) {
    const token_value = fromSessionTokenToSessionValue(sessionToken);

    const session: Session = {
        user_id: user_id,
        expires_at: new Date(Date.now() + SESSION_MAX_DURATION_MS),
        token_value: token_value
    };

    storeSession(session);
    return session;
};

function fromSessionTokenToSessionValue(sessionToken: string) {
    return encodeHexLowerCase(sha256(new TextEncoder().encode(sessionToken)));
};

export async function validateSession(sessionToken: string) {
    const tokenValue = fromSessionTokenToSessionValue(sessionToken);
    const result = await getSessionByTokenValue(tokenValue);

    if (!result) {
        return null;
    }

    const { user_id, expires_at, token_value } = result;

    const session: Session = {
        user_id: user_id,
        expires_at: expires_at,
        token_value: token_value
    }
  
    // If the session has expired, delete it
    if (Date.now() >= new Date(session.expires_at).getTime()) {
      await deleteSessionByTokenValue(session.token_value);
      return null;
    }
  
    // If there are 15 days left until the session expires, refresh the session
    if (Date.now() >= new Date(session.expires_at).getTime() - SESSION_REFRESH_INTERVAL_MS) {
      session.expires_at = new Date(Date.now() + SESSION_MAX_DURATION_MS);
      await updateSession(session);
    }
  
    return session;
}

/**
 * Deletes a session and corresponding cookie when logging out.
 */
export async function signOut() {
    const session = await getValidatedSession();
      
    if (session) {
        await deleteSessionByTokenValue(session.token_value);
        await deleteSessionCookie();
    }

    revalidatePath('/', 'layout');
    redirect('/account');
}