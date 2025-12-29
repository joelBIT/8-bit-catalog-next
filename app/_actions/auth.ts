'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { v4 as uuidv4 } from 'uuid';
import { emailExists, getUserByEmail, registerUser, updateUserPassword, isCurrentPassword } from "@/app/_db/users-db";
import { hashPassword, verifyPasswordHash } from "@/app/_session/password";
import { createSession, generateRandomSessionToken } from "@/app/_session/session";
import ResetPasswordEmail from "../_components/email/ResetPasswordEmail";
import ActivationEmail from "../_components/email/ActivationEmail";
import { setSessionCookie } from "@/app/_session/cookie";
import { isAuthenticated } from "@/app/_session/sessionUtils";
import { URL_DASHBOARD_PAGE } from "@/app/_utils/utils";
import { ActionState } from "@/app/_types/types";
import { updateProfileByUserId } from "../_db/profiles-db";
import { createAccount, getAccountByUserId } from "../_db/accounts-db";
import { updateAddressByUserId } from "../_db/addresses-db";

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
    const phone = formData.get('phone') as string;
    const street = formData.get('street') as string;
    const city = formData.get('city') as string;
    const country = formData.get('country') as string;
    const fullName = formData.get('full_name') as string;
    const birthDate = formData.get('birth_date') as string;

    if (password !== passwordRepeat) {
        return { message: 'Passwords must be equal', success: false };
    }

    if (password.length < 8) {
        return { message: 'Password must be at least 8 characters', success: false };
    }

    if (!/\d/.test(password)) {
        return { message: 'Password must contain at least 1 number', success: false };
    }

    try {
        const passwordHash = await hashPassword(password);
        const user = await registerUser(email, passwordHash, email);
        await updateProfileByUserId(user.id, fullName, phone, birthDate);
        await updateAddressByUserId({user_id: user.id, street, city, country, zip_code: ''});
        const activationCode = uuidv4();
        await createAccount(user.id, activationCode);
        sendActivationMail(user.email, activationCode);
        
        return { message: 'Registration successful. Check email for activation link.', success: true };
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
        const exists = await emailExists(email);
        if (!exists) {
            return { message: 'No such email', success: false };
        }
        const newPassword = uuidv4();
        const passwordHash = await hashPassword(newPassword);
        await updateUserPassword(email, passwordHash);
        sendPasswordResetMail(email, newPassword);
        
        return { message: 'Password changed. Check email.', success: true };
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
async function sendActivationMail(email: string, activationCode: string): Promise<void> {
    const resend = new Resend(process.env.RESEND_API_KEY as string);

    await resend.emails.send({
        from: '8bit <onboarding@joel-rollny.eu>',
        to: email,
        subject: 'Finish registration',
        react: ActivationEmail(activationCode),
    });
}

/**
 * Sends an email containing the new password to the supplied email address.
 */
async function sendPasswordResetMail(email: string, password: string): Promise<void> {
    const resend = new Resend(process.env.RESEND_API_KEY as string);

    await resend.emails.send({
        from: '8bit <onboarding@joel-rollny.eu>',
        to: email,
        subject: 'Password Reset',
        react: ResetPasswordEmail(password, email),
    });
}

/**
 * This function is invoked when a user changes password from the reset password to a new password for an account.
 */
export async function changeAccountPassword(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    const email = formData.get('email') as string;
    const oldPassword = formData.get('oldPassword') as string;
    const newPassword = formData.get('password') as string;
    const passwordRepeat = formData.get('passwordRepeat') as string;

    console.log('email ' + email);

    try {
        const exists = await emailExists(email);
        if (!exists) {
            return { message: 'No such email', success: false };
        }

        const oldPasswordHash = await hashPassword(oldPassword);
        if (!isCurrentPassword(email, oldPasswordHash)) {
            return { message: 'Old password is not correct', success: false };
        }
        
        if (newPassword !== passwordRepeat) {
            return { message: 'Passwords must be equal', success: false };
        }

        if (newPassword.length < 8) {
            return { message: 'Password must be at least 8 characters', success: false };
        }

        if (!/\d/.test(newPassword)) {
            return { message: 'Password must contain at least 1 number', success: false };
        }

        const passwordHash = await hashPassword(newPassword);
        await updateUserPassword(email, passwordHash);
        
        return { message: 'Password updated', success: true};
    } catch (error) {
        if (error instanceof Error) {
            return { message: error.message, success: false };
        }
        return { message: 'Could not change password', success: false };
    }
}