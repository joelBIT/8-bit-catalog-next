'use server';

import { Resend } from "resend";
import { v4 as uuidv4 } from 'uuid';
import { emailExists, updateUserPassword, isCurrentPassword, getUserById, updatePasswordByUserId } from "@/app/_db/users-db";
import { hashPassword, verifyPasswordHash } from "@/app/_session/password";
import ResetPasswordEmail from "../_components/email/ResetPasswordEmail";
import { ActionState } from "@/app/_types/types";
import { isAuthenticated } from "../_session/sessionUtils";

/**
 * This function is invoked when a user resets the password in the 'Forgot Password Page'.
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
 * This function is invoked when a user changes password from the 'Reset Password Page' to a new password for an account.
 */
export async function changePassword(_prevState: ActionState, formData: FormData): Promise<ActionState> {
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

/**
 * This function is invoked when a user changes the account password from the dashboard.
 * A user must enter the correct current password before it is updated to the new password.
 */
export async function updateAccountPassword(userId: number, _prevState: ActionState, formData: FormData): Promise<ActionState> {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return { message: 'Must be authenticated to update password', success: false };
    }
    
    const oldPassword = formData.get('oldPassword') as string;
    const password = formData.get('password') as string;
    const passwordRepeat = formData.get('passwordRepeat') as string;

    if (password !== passwordRepeat) {
        return { message: 'The entered passwords must be equal', success: false };
    }

    if (password.length < 8) {
        return { message: 'Password must be at least 8 characters', success: false };
    }

    if (!/\d/.test(password)) {
        return { message: 'Password must contain at least 1 number', success: false };
    }

    try {
        const user = await getUserById(userId);
        const validPassword = await verifyPasswordHash(user.passwordHash, oldPassword);
        if (!validPassword) {
            return { message: 'Old password is incorrect', success: false };
        }

        const passwordHash = await hashPassword(password);
        await updatePasswordByUserId(userId, passwordHash);

        return { message: 'The password was successfully updated', success: true };
    } catch (error) {
        console.log(error);
        return { message: 'The password could not be updated', success: false };
    }
}