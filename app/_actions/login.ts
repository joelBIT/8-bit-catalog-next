'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAccountByUserId } from "../_db/accounts-db";
import { getUserByEmail } from "../_db/users-db";
import { verifyPasswordHash } from "../_session/password";
import { isAuthenticated } from "../_session/sessionUtils";
import { ActionState } from "../_types/types";
import { URL_DASHBOARD_PAGE } from "../_utils/utils";
import { createSession, generateRandomSessionToken } from "../_session/session";
import { setSessionCookie } from "../_session/cookie";

export async function login(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        const user = await getUserByEmail(email);
        const account = await getAccountByUserId(user.id);

        if (!account.activated) {
            return { message: 'Account is not activated', success: false };
        }

        const validPassword = await verifyPasswordHash(user.passwordHash, password);
        if (!validPassword) {
            return { message: 'Password is incorrect', success: false };
        }

        const authenticated = await isAuthenticated();
        if (!authenticated) {                           // Only create a new session when the user is not logged in
            await initiateSession(user.id);
        }
    } catch (error) {
        console.log(error);
        return { message: 'Could not log in', success: false };
    }

    revalidatePath('/', 'layout');
    redirect(URL_DASHBOARD_PAGE);
}

/**
 * Creates a session in the database and a cookie for the browser when a user signs in.
 */
async function initiateSession(userId: number): Promise<void> {
    const sessionToken = await generateRandomSessionToken();
    const session = await createSession(sessionToken, userId);

    await setSessionCookie(sessionToken, session.expiresAt);
}