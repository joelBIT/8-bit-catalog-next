'use server';

import { createActivatedAccount, getUserById, updatePassword, updateProfileImageById, updateUser, updateUserInformationById } from "@/app/_db/db";
import { hashPassword, verifyPasswordHash } from "@/app/_session/password";
import { isAuthenticated, isAuthenticatedAdmin } from "@/app/_session/utils";
import { ActionState, InitialUserState } from "@/app/_types/types";

/**
 * This function is invoked when a user updates account information such as account password.
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
 * This function is invoked when updating user information such as name and bio.
 */
export async function updateUserDetails(userId: number, _prevState: InitialUserState, formData: FormData): Promise<InitialUserState> {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return { message: 'Must be authenticated to update user information', success: false, firstName: '', lastName: '', bio: '', birthDate: '',
            city: '', country: '', fullName: '', address: ''
         };
    }
    
    try {
        const firstName = formData.get('first_name') as string;
        const fullName = formData.get('full_name') as string;
        const lastName = formData.get('last_name') as string;
        const birthDate = formData.get('birth_date') as string;
        const city = formData.get('city') as string;
        const address = formData.get('address') as string;
        const phone = formData.get('phone') as string;
        const userBio = formData.get('bio') as string;
        const country = formData.get('country') as string;
        await updateUser(userId, lastName, firstName, userBio);
        await updateUserInformationById(userId, fullName, phone, address, city, country, birthDate);

        return { message: 'The account was successfully updated', success: true, firstName: firstName, lastName: lastName, 
            bio: userBio, birthDate: birthDate, city: city, country: country, fullName: fullName, address: address };
    } catch (error) {
        console.log(error);
        return { message: 'The account could not be updated', success: false, firstName: '', lastName: '', bio: '', birthDate: '',
            city: '', country: '', fullName: '', address: ''
         };
    }
}

/**
 * Updates a user's profile image.
 */
export async function updateProfileImage(userId: number, _prevState: {message: string, success: boolean, image: string}, formData: FormData): Promise<{message: string, success: boolean, image: string}> {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return { message: 'Must be authenticated to update profile image', success: false, image: _prevState.image };
    }
    
    try {
        const profileImage = formData.get('profileImage') as File;
        if (profileImage.name !== 'undefined') {                        // Profile image has been changed
            await updateProfileImageById(userId, profileImage);             // Upload new profile image
            return { message: 'The account was successfully updated', success: true, image: profileImage.name };
        } else {
            return { message: 'The account was successfully updated', success: true, image: _prevState.image };
        }
    } catch (error) {
        console.log(error);
        return { message: 'The account could not be updated', success: false, image: _prevState.image };
    }
}

/**
 * Used by admin to create a new user and account by bypassing the email verification process. There are no
 * restrictions on the password when adding a user as admin.
 */
export async function createUserAndAccount(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    const isAdmin = await isAuthenticatedAdmin();
    if (!isAdmin) {
        return { message: 'Only admins may create accounts', success: false };
    }

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    let username = formData.get('username') as string;
    if (!username) {
        username = email;       // Set username same as email if username is missing since email is unique
    }

    try {
        const passwordHash = await hashPassword(password);
        await createActivatedAccount(email, passwordHash, username);

        return { message: 'The account was successfully created', success: true };
    } catch (error) {
        console.log(error);

        if (error instanceof Error) {
            return { message: error.message, success: false };
        }
        return { message: 'The account could not be created', success: false };
    }
}