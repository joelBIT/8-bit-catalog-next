'use server';

import { getUserById, updatePassword, updateProfileImage, updateUser, updateUserBio } from "@/db/db";
import { hashPassword, verifyPasswordHash } from "@/auth/password";

/**
 * This function is invoked when a user updates account information such as account password.
 * A user must enter the correct current password before it is updated to the new password.
 */
export async function updateAccountPassword(userId: number, _prevState: any, formData: FormData) {
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
        console.log(error);
        return { message: 'The password could not be updated', success: false };
    }
}

/**
 * This function is invoked when updating user information such as name.
 */
export async function updateUserDetails(userId: number, _prevState: any, formData: FormData) {
    try {
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        await updateUser(userId, lastName, firstName);

        return { message: 'The account was successfully updated', success: true, firstName: firstName, lastName: lastName };
    } catch (error) {
        console.log(error);
        return { message: 'The account could not be updated', success: false };
    }
}

export async function updateProfile(userId: number, _prevState: any, formData: FormData) {
    try {
        const userBio = formData.get('bio') as string;
        await updateUserBio(userId, userBio);

        const profileImage = formData.get('profileImage') as File;
        if (profileImage.name !== 'undefined') {                        // Profile image has been changed
            await updateProfileImage(userId, profileImage);             // Upload new profile image

            return { message: 'The account was successfully updated', success: true, bio: userBio, image: profileImage.name };
        } else {
            return { message: 'The account was successfully updated', success: true, bio: userBio, image: _prevState.image };
        }
    
    } catch (error) {
        console.log(error);
        return { message: 'The account could not be updated', success: false };
    }
}