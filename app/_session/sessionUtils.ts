'use server';

import { getValidatedSession } from "@/app/_session/cookie";
import { getUserById } from "@/app/_db/users-db";
import { User } from "@/app/_types/types";
import { USER_ROLE_ADMIN } from "@/app/_utils/utils";



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

    const user = await getUserById(session.userId);
    return user.role === USER_ROLE_ADMIN;
}

/**
 * Returns the user of the current session. If there is no session the value 'undefined' is implicitly returned from the function.
 */
export async function getUserFromSession(): Promise<User | undefined> {
    const session = await getValidatedSession();
    if (session) {
        return await getUserById(session.userId);
    }
}