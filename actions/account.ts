'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUserByEmail, registerUser } from "@/db/db";
import { hashPassword, verifyPasswordHash } from "@/auth/password";
import { createSession, generateRandomSessionToken } from "@/auth/session";
import { setSessionCookie } from "@/auth/cookie";

export async function login(_prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        const user = await getUserByEmail(email);
        const validPassword = await verifyPasswordHash(user.data?.password_hash, password);
        if (!validPassword) {
            return { message: 'Password is incorrect', success: false };
        }

        const sessionToken = await generateRandomSessionToken();
        const session = await createSession(sessionToken, user.data?.id);

        await setSessionCookie(sessionToken, session.expires_at);
    } catch (error) {
        return { message: 'Could not log in', success: false };
    }

    revalidatePath('/', 'layout');
    redirect('/account');
}

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
  
        const sessionToken = await generateRandomSessionToken();
        const session = await createSession(sessionToken, parseInt(user?.id));

        await setSessionCookie(sessionToken, session.expires_at);
    } catch (error) {
        if (error instanceof Error) {
            return { message: error.message, success: false };
        }
        return { message: 'Could not create account', success: false };
    }

    revalidatePath('/', 'layout');
    redirect('/account');
}