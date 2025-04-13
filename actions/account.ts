'use server';

import { createActivatedAccount, getUserById, updatePassword, updateProfileImageById, updateUser } from "@/db/db";
import { hashPassword, verifyPasswordHash } from "@/auth/password";

/**
 * This function is invoked when a user updates account information such as account password.
 * A user must enter the correct current password before it is updated to the new password.
 */
export async function updateAccountPassword(userId: number, _prevState: any, formData: FormData): Promise<{message: string, success: boolean}> {
    const oldPassword = formData.get('oldPassword') as string;
    const password = formData.get('password') as string;
    const passwordRepeat = formData.get('passwordRepeat') as string;

    if (password !== passwordRepeat) {
        return { message: 'The entered passwords must be equal', success: false };
    }

    try {
        const user = await getUserById(userId);
        const validPassword = await verifyPasswordHash(user.password_hash, oldPassword);
        if (!validPassword) {
            return { message: 'Old password is incorrect', success: false };
        }

        const passwordHash = await hashPassword(password);
        await updatePassword(userId, passwordHash);

        return { message: 'The password was successfully updated', success: true };
    } catch (error) {
        return { message: 'The password could not be updated', success: false };
    }
}

/**
 * This function is invoked when updating user information such as name and bio.
 */
export async function updateUserDetails(userId: number, _prevState: any, formData: FormData): Promise<{message: string, success: boolean, firstName: string, lastName: string, bio: string}> {
    try {
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const userBio = formData.get('bio') as string;
        await updateUser(userId, lastName, firstName, userBio);

        return { message: 'The account was successfully updated', success: true, firstName: firstName, lastName: lastName, bio: userBio };
    } catch (error) {
        return { message: 'The account could not be updated', success: false, firstName: '', lastName: '', bio: '' };
    }
}

/**
 * Updates a user's profile image.
 */
export async function updateProfileImage(userId: number, _prevState: any, formData: FormData): Promise<{message: string, success: boolean, image: string}> {
    try {
        const profileImage = formData.get('profileImage') as File;
        if (profileImage.name !== 'undefined') {                        // Profile image has been changed
            await updateProfileImageById(userId, profileImage);             // Upload new profile image
            return { message: 'The account was successfully updated', success: true, image: profileImage.name };
        } else {
            return { message: 'The account was successfully updated', success: true, image: _prevState.image };
        }
    } catch (error) {
        return { message: 'The account could not be updated', success: false, image: _prevState.image };
    }
}

/**
 * Used by admin to create a new user and account by bypassing the email verification process.
 */
export async function createUserAndAccount(_prevState: any, formData: FormData): Promise<{message: string, success: boolean}> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        const passwordHash = await hashPassword(password);
        await createActivatedAccount(email, passwordHash);

        return { message: 'The account was successfully created', success: true };
    } catch (error) {
        if (error instanceof Error) {
            return { message: error.message, success: false };
        }
        return { message: 'The account could not be created', success: false };
    }
}