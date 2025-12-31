'use server';

import { updateEmailByUserId, updateUsernameByUserId } from "../_db/users-db";
import { isAuthenticated } from "../_session/sessionUtils";
import { ActionState } from "../_types/types";

/**
 * User must be logged in to update email (and the new email must be unique).
 */
export async function updateEmail(userId: number, _prevState: ActionState & {email: string}, formData: FormData): Promise<ActionState & {email: string}> {
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

/**
 * User must be logged in to update username (and the new username must be unique).
 */
export async function updateUsername(userId: number, _prevState: ActionState & {username: string}, formData: FormData): Promise<ActionState & {username: string}> {
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