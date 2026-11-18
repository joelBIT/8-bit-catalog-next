'use client';

import { authClient } from "@/app/auth-client";
import { ROLE_ADMIN } from "../_utils/utils";

/**
 * @returns true if there is an active session. False while loading or when signed out.
 */
export function useIsAuthenticated(): boolean {
    const { data: session } = authClient.useSession();
    return !!session;
}

/**
 * @returns true if the signed in user has the admin role.
 */
export function useIsAdmin(): boolean {
    const { data: session } = authClient.useSession();
    return session?.user.role === ROLE_ADMIN;
}

/**
 * Not a hook: safe to call from event handlers.
 * @param onSuccess is executed if the signOut process is successful.
 */
export async function signOut(onSuccess: () => void): Promise<void> {
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => onSuccess()
        }
    });
}