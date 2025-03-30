'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getImageLink, getUserByEmail, PROFILE_IMAGES_STORAGE, registerUser, updateProfileImage, updateUser, updateUserBio } from "@/db/db";
import { hashPassword, verifyPasswordHash } from "@/auth/password";
import { createSession, generateRandomSessionToken } from "@/auth/session";
import { setSessionCookie } from "@/auth/cookie";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/utils";

/**
 * This function is invoked when a user tries to log in (get access to the user's account).
 */
export async function login(_prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        const user = await getUserByEmail(email);
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
  
        await initiateSession(parseInt(user?.id));
    } catch (error) {
        if (error instanceof Error) {
            return { message: error.message, success: false };
        }
        return { message: 'Could not create account', success: false };
    }

    revalidatePath('/', 'layout');
    redirect('/account');
}

async function initiateSession(userId: number) {
    const sessionToken = await generateRandomSessionToken();
    const session = await createSession(sessionToken, userId);

    await setSessionCookie(sessionToken, session.expires_at);
}

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
    
        return { message: 'The account was successfully updated', success: true, bio: userBio };
    } catch (error) {
        console.log(error);
        return { message: 'The account could not be updated', success: false };
    }
}