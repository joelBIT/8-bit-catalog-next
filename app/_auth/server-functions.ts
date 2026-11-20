import 'server-only';

import { cache } from 'react';
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "../auth";
import { ROLE_ADMIN, URL_LOGIN_PAGE } from "../_utils/utils";

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
 * Current user, or null. cache() means one session lookup per request however often this is called. 
 */
const getSessionUser = cache(async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    return session?.user ?? null;
});

export async function requireUser() {
    const user = await getSessionUser();
    if (!user) {
        redirect(URL_LOGIN_PAGE);
    }
    return user;
}

export async function requireAdmin() {
    const user = await requireUser();
    if (user.role !== ROLE_ADMIN) {
        notFound();                         // non-admins get a 404 instead of learning the page exists
    }
    return user;
}