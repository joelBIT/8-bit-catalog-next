'use client';

import { authClient } from "@/app/auth-client";

export function isAuthenticated(): boolean {
    const { data: session } = authClient.useSession();

    if (!session) {
        return false;
    }

    return true;
}