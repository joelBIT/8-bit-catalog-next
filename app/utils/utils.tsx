'use server';

import { getValidatedSession } from "@/auth/cookie";

/**
 * This function is used to determine what the user is allowed to access in the GUI.
 * 
 * @returns         true if the user is authenticated, false otherwise
 */
export async function isAuthenticated() {
    const session = await getValidatedSession();

    if (!session) {
        return false;
    }
    
    return true;
}