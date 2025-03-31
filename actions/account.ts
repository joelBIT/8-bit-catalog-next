'use server';

import { updateProfileImage, updateUser, updateUserBio } from "@/db/db";
import { hashPassword } from "@/auth/password";

/**
 * This function is invoked when a user updates account information.
 */
export async function update(userId: number, _prevState: any, formData: FormData) {
    const password = formData.get('password') as string;
    const passwordRepeat = formData.get('passwordRepeat') as string;

    if (password !== passwordRepeat) {
        return { message: 'The entered passwords must be equal', success: false };
    }

    try {
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const passwordHash = await hashPassword(password);

        await updateUser(userId, passwordHash, lastName, firstName);
        return { message: 'The account was successfully updated', success: true, firstName: firstName, lastName: lastName };
    } catch (error) {
        console.log(error);
    }
}

export async function updateProfile(userId: number, _prevState: any, formData: FormData) {
    try {
        const profileImage = formData.get('profileImage') as File;
        if (profileImage.name !== 'undefined') {
            await updateProfileImage(userId, profileImage);
        }
    
        const userBio = formData.get('bio') as string;
        await updateUserBio(userId, userBio);
    
        return { message: 'The account was successfully updated', success: true, bio: userBio, image: profileImage.name };
    } catch (error) {
        console.log(error);
        return { message: 'The account could not be updated', success: false };
    }
}