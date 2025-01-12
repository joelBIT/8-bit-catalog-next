'use server';

import { createAuthClient } from '@/utils/supabase/server';

/**
 * This function is used to determine what the user is allowed to access in the GUI.
 * 
 * @returns         true if the user is authenticated, false otherwise
 */
export async function isAuthenticated() {
    const serverClient = await createAuthClient();
    const { data: { user } } = await serverClient.auth.getUser();
    if (user) {
        return user.role === "authenticated";
    }
    return false;
}