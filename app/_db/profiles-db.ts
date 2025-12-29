import 'server-only';

import { databaseClient, PROFILES_TABLE } from './db';
import { Profile } from '../_types/types';




/**
 * Retrieve profile information about the user with supplied user ID.
 */
export async function getProfileByUserId(user_id: number): Promise<Profile> {
    const { data, error } = await databaseClient.from(PROFILES_TABLE).select().eq('user_id', user_id).single();
    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

/**
 * Update profile for user with supplied user ID.
 */
export async function updateProfileByUserId(id: number, full_name: string, phone: string, birth_date: string): Promise<void> {
    const { error } = await databaseClient.from(PROFILES_TABLE).update({full_name, phone, birth_date}).eq('user_id', id);
    if (error) {
        console.log(error);
        throw error;
    }
}