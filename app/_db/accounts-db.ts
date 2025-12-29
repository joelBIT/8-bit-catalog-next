import 'server-only';

import { ACCOUNTS_TABLE, databaseClient } from './db';
import { registerUser } from './users-db';
import { Account } from '../_types/types';


const PROFILE_IMAGES_STORAGE = "catalog";



/**
 * Create an account for user with supplied user ID, and store the activation code (which is also sent to the user email).
 * The account must be activated before a user is able to sign in.
 */
export async function createAccount(user_id: number, activation_code: string): Promise<void> {
    await databaseClient.from(ACCOUNTS_TABLE).insert({ user_id, activation_code });
}

/**
 * Copies the default profile image to the folder created for the newly registered user. The folder is named
 * after the registered user's id.
 */
export async function copyProfileImageToFolder(activation_code: string): Promise<void> {
    try {
        const response = await databaseClient.from(ACCOUNTS_TABLE).select().eq('activation_code', activation_code).single();
        await databaseClient.storage.from(PROFILE_IMAGES_STORAGE).copy('profile.png', `${response.data?.user_id}/profile.png`);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Retrieve account information for user with supplied user ID.
 */
export async function getAccountByUserId(user_id: number): Promise<Account> {
    const { data, error } = await databaseClient.from(ACCOUNTS_TABLE).select().eq('user_id', user_id).single();
    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

/**
 * First a check is done to see if the activation code is valid. Then the corresponding account is activated.
 */
export async function activateAccount(activation_code: string): Promise<boolean> {
    const { data, error } = await databaseClient.from(ACCOUNTS_TABLE).select().eq('activation_code', activation_code).eq('activated', false);
    if (error || data.length === 0) {
        return false;
    }

    await databaseClient.from(ACCOUNTS_TABLE).update({activated: true}).eq('activation_code', activation_code);    
    return true;
}

/**
 * Used by admin to create a user and account directly by bypassing the email activation procedure.
 */
export async function createActivatedAccount(email: string, password_hash: string, username: string): Promise<void> {
    const user = await registerUser(email, password_hash, username);
    await databaseClient.from(ACCOUNTS_TABLE).insert({ user_id: user.id, activated: true });
    await databaseClient.storage.from(PROFILE_IMAGES_STORAGE).copy('profile.png', `${user.id}/profile.png`);
}
