'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { v4 as uuidv4 } from 'uuid';
import { createAccount, getAccount, getUserByEmail, registerUser } from "@/db/db";
import { hashPassword, verifyPasswordHash } from "@/auth/password";
import { createSession, generateRandomSessionToken } from "@/auth/session";
import { setSessionCookie } from "@/auth/cookie";
import ActivationEmail from "@/components/email/ActivationEmail";

/**
 * This function is invoked when a user tries to log in (get access to the user's account).
 */
export async function login(_prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        const user = await getUserByEmail(email);
        const account = await getAccount(user.data?.id);

        if (account.error?.code) {
            return { message: 'No such account', success: false };
        }

        if (!account.data?.activated) {
            return { message: 'Account is not activated', success: false };
        }

        const validPassword = await verifyPasswordHash(user.data?.password_hash, password);
        if (!validPassword) {
            return { message: 'Password is incorrect', success: false };
        }

        await initiateSession(user.data?.id);
    } catch (error) {
        return { message: 'Could not log in', success: false };
    }

    revalidatePath('/', 'layout');
    redirect('/account');
}

/**
 * This function is invoked when a user tries to create an account.
 */
export async function register(_prevState: any, formData: FormData) {
    const password = formData.get('password') as string;
    const passwordRepeat = formData.get('passwordRepeat') as string;
    const email = formData.get('email') as string;

    if (password !== passwordRepeat) {
        return { message: 'The entered passwords must be equal', success: false };
    }

    try {
        const passwordHash = await hashPassword(password);
        const user = await registerUser(email, passwordHash);
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

async function initiateSession(userId: number) {
    const sessionToken = await generateRandomSessionToken();
    const session = await createSession(sessionToken, userId);

    await setSessionCookie(sessionToken, session.expires_at);
}

async function sendMail(email: string, activationCode: string) {
    const resend = new Resend(process.env.RESEND_API_KEY as string);

    const response = await resend.emails.send({
        from: '8bit <onboarding@joel-rollny.eu>',
        to: email,
        subject: 'Finish registration',
        react: ActivationEmail(activationCode),
    });
}