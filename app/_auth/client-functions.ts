'use client';

import { authClient } from "@/app/auth-client";
import { ROLE_ADMIN } from "../_utils/utils";
import { User } from "../_db/schema/auth/users";

export function isAuthenticated(): boolean {
    const { data: session } = authClient.useSession();

    if (!session) {
        return false;
    }

    return true;
}

export function isAuthenticatedAdmin(): boolean {
    const { data: session } = authClient.useSession();

    if (session?.user.role === ROLE_ADMIN) {
        return true;
    }

    return false;
}

/**
 * @returns the signed in user
 */
export function getUser(): User {
    const { data: session } = authClient.useSession();

    if (session?.user) {
        return session.user as User;
    }

    throw new Error("No authenticated user found");
}

/**
 * @param onSuccess is executed if the signOut process is successful.
 */
export async function signOut(onSuccess: () => void): Promise<void> {
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                onSuccess();
            }
        }
    });
}