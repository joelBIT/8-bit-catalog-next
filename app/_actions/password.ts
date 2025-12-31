'use server';

import { Resend } from "resend";
import { v4 as uuidv4 } from 'uuid';
import { emailExists, updateUserPassword, isCurrentPassword } from "@/app/_db/users-db";
import { hashPassword } from "@/app/_session/password";
import ResetPasswordEmail from "../_components/email/ResetPasswordEmail";
import { ActionState } from "@/app/_types/types";

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