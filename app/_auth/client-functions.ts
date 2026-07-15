'use client';

import { authClient } from "@/app/auth-client";
import { ROLE_ADMIN } from "../_utils/utils";

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