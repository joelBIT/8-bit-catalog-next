import { headers } from "next/headers";
import { auth } from "../auth";
import { ROLE_ADMIN } from "../_utils/utils";
import { User } from "../_db/schema/auth/users";

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

/**
 * @returns the signed in user
 */
export async function getUser(): Promise<User> {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session?.user) {
        return session.user as User;
    }

    throw new Error("No authenticated user found");
}