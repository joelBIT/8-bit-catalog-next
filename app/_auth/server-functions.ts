import { headers } from "next/headers";
import { auth } from "../auth";
import { ROLE_ADMIN } from "../_utils/utils";

export async function isAuthenticated(): Promise<boolean> {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return false;
    }

    return true;
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session?.user?.role === ROLE_ADMIN) {
        return true;
    }

    return false;
}