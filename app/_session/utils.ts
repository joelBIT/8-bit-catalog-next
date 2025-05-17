'use server';

import { getValidatedSession } from "@/app/_session/cookie";
import { getUserById } from "@/db/db";
import { User } from "@/types/types";
import { USER_ROLE_ADMIN } from "@/utils/utils";



/*********************************************************************************
* This file contains functions that interact with the session on the server side *
**********************************************************************************/



/**
 * This function is used to determine what the user is allowed to access
 * 
 * @returns         true if the user is authenticated, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
    const session = await getValidatedSession();
    if (!session) {
        return false;       // If no session exist, the user is not authenticated
    }
    
    return true;
}

/**
 * This function is used to determine what the user is allowed to access
 * 
 * @returns         true if the user is an authenticated admin, false otherwise
 */
export async function isAuthenticatedAdmin(): Promise<boolean> {
    const session = await getValidatedSession();
    if (!session) {
        return false;       // If no session exist, the user is not authenticated
    }

    const user = await getUserById(session.user_id);
    return user.role === USER_ROLE_ADMIN;
}

/**
 * Returns the user of the current session. If there is no session the value 'undefined' is implicitly returned from the function.
 */
export async function getUserFromSession(): Promise<User | undefined> {
    const session = await getValidatedSession();
    if (session) {
        return await getUserById(session.user_id);
    }
}