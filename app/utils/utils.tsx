'use server';

import { createAuthClient } from '@/utils/supabase/server';

export async function isAuthenticated() {
    const serverClient = await createAuthClient();
    const { data: { user } } = await serverClient.auth.getUser();
    if (user) {
        return user.role === "authenticated";
    }
    return false;
}