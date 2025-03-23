'use server';

import { getValidatedSession } from "@/auth/cookie";
import { getUserById } from "@/db/db";

/**
 * This function is used to determine what the user is allowed to access
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

/**
 * This function is used to determine what the user is allowed to access
 * 
 * @returns         true if the user is an authenticated admin, false otherwise
 */
export async function isAuthenticatedAdmin() {
    const session = await getValidatedSession();

    if (session) {
        const { data } = await getUserById(session.user_id);
        return data?.role === 'admin';        
    }

    return false;
}