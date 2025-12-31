'use server';

import { updateEmailByUserId, updateUsernameByUserId } from "@/app/_db/users-db";
import { hashPassword } from "@/app/_session/password";
import { isAuthenticated, isAuthenticatedAdmin } from "@/app/_session/sessionUtils";
import { ActionState } from "@/app/_types/types";
import { createActivatedAccount } from "../_db/accounts-db";
import { InsertAddress } from "../_db/schema/addresses";

/**
 * Used by admin to create a new user and account by bypassing the email verification process. There are no
 * restrictions on the password when adding a user as admin.
 */
export async function createUserAndAccountAsAdmin(_prevState: ActionState, formData: FormData): Promise<ActionState> {
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

export async function updateAccountEmail(userId: number, _prevState: ActionState & {email: string}, formData: FormData): Promise<ActionState & {email: string}> {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return { message: 'Must be authenticated to update email', success: false, email: _prevState.email };
    }
    
    const email = formData.get('email') as string;
    if (!email) {
        return { message: 'An email address must be supplied', success: false, email: _prevState.email };
    }

    try {
        await updateEmailByUserId(userId, email);

        return { message: 'The email address was successfully updated', success: true, email: email };
    } catch (error) {
        console.log(error);
        return { message: 'The email address could not be updated', success: false, email: _prevState.email };
    }
}

export async function updateAccountUsername(userId: number, _prevState: ActionState & {username: string}, formData: FormData): Promise<ActionState & {username: string}> {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return { message: 'Must be authenticated to update username', success: false, username: _prevState.username };
    }
    
    const username = formData.get('username') as string;
    if (!username) {
        return { message: 'A username must be supplied', success: false, username: _prevState.username };
    }

    try {
        await updateUsernameByUserId(userId, username);

        return { message: 'The username was successfully updated', success: true, username: username };
    } catch (error) {
        console.log(error);
        return { message: 'The username could not be updated', success: false, username: _prevState.username };
    }
}

export async function updateUserAddress(_prevState: ActionState & InsertAddress, formData: FormData): Promise<ActionState & InsertAddress> {
    return { ..._prevState, message: 'The address was successfully updated', success: true };
}