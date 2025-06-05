'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { v4 as uuidv4 } from 'uuid';
import { createAccount, getAccountByUserId, getUserByEmail, registerUser } from "@/app/_db/db";
import { hashPassword, verifyPasswordHash } from "@/app/_session/password";
import { createSession, generateRandomSessionToken } from "@/app/_session/session";
import { setSessionCookie } from "@/app/_session/cookie";
import ActivationEmail from "@/app/_components/email/ActivationEmail";
import { isAuthenticated } from "@/app/_session/utils";
import { URL_DASHBOARD_PAGE } from "@/app/_utils/utils";
import { ActionState } from "@/app/_types/types";

/**
 * This function is invoked when a user tries to log in.
 */
export async function login(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        const user = await getUserByEmail(email);
        const account = await getAccountByUserId(user.id);

        if (!account.activated) {
            return { message: 'Account is not activated', success: false };
        }

        const validPassword = await verifyPasswordHash(user.password_hash, password);
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
 * This function is invoked when a user tries to create an account.
 */
export async function register(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    const password = formData.get('password') as string;
    const passwordRepeat = formData.get('passwordRepeat') as string;
    const email = formData.get('email') as string;
    const username = formData.get('username') as string;

    if (password !== passwordRepeat) {
        return { message: 'Passwords must be equal', success: false };
    }

    try {
        const passwordHash = await hashPassword(password);
        const user = await registerUser(email, passwordHash, username);
        const activationCode = uuidv4();
        await createAccount(user.id, activationCode);
        sendMail(user.email, activationCode);
        
        return { message: 'Account has been created', success: true };
    } catch (error) {
        if (error instanceof Error) {
            return { message: error.message, success: false };
        }
        return { message: 'Could not create account', success: false };
    }
}

/**
 * This function is invoked when a user resets the password for an account.
 */
export async function resetPassword(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    const email = formData.get('email') as string;

    try {
        // check if email exists, send an error message if it does not
        const newPassword = uuidv4();
        //await updateAccountPassword(email, newPassword);
        //sendMail(email, newPassword);
        
        return { message: 'Password has been changed', success: true };
    } catch (error) {
        if (error instanceof Error) {
            return { message: error.message, success: false };
        }
        return { message: 'Could not change password', success: false };
    }
}

/**
 * Creates a session in the database and a cookie for the browser when a user signs in.
 */
async function initiateSession(userId: number): Promise<void> {
    const sessionToken = await generateRandomSessionToken();
    const session = await createSession(sessionToken, userId);

    await setSessionCookie(sessionToken, session.expires_at);
}

/**
 * Sends an email containing a link with the activation code to the supplied email address.
 */
async function sendMail(email: string, activationCode: string): Promise<void> {
    const resend = new Resend(process.env.RESEND_API_KEY as string);

    await resend.emails.send({
        from: '8bit <onboarding@joel-rollny.eu>',
        to: email,
        subject: 'Finish registration',
        react: ActivationEmail(activationCode),
    });
}