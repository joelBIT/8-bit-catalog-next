'use server';

import { cookies } from "next/headers";
import { validateSession } from "./session";

/**
 * Set a cookie with the session token when the user signs up/in.
 */
export const setSessionCookie = async (sessionToken: string, expires_at: Date) => {
    const cookie = {
        name: "session",
        value: sessionToken,
        attributes: {
            httpOnly: true,
            sameSite: "lax" as const,
            path: "/",
            expires: expires_at,
        },
    };

    (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
};

/**
 * Delete the cookie when the user signs out.
 */
export const deleteSessionCookie = async () => {
    const cookie = {
        name: "session",
        value: "",
        attributes: {
            httpOnly: true,
            sameSite: "lax" as const,
            path: "/",
            maxAge: 0,
        },
    };
  
    (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
};

/**
 * With every request the user sends to the server, which attempts to access a protected 
 * resource, we need to validate the session cookie. If the cookie exists, we extract the 
 * session token from it and validate the session from the database. If the session is 
 * valid, we return the session and the user. Otherwise we delete the session in the database 
 * and return null for the session and the user.
 */
export async function getValidatedSession() {
    const sessionToken = (await cookies()).get("session")?.value ?? null;
  
    if (!sessionToken) {
      return null;
    }
  
    return await validateSession(sessionToken);
};