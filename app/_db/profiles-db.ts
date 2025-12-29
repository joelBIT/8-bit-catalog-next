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
export async function updateProfileByUserId(profile: Profile): Promise<void> {
    const { error } = await databaseClient.from(PROFILES_TABLE).update({...profile}).eq('user_id', profile.user_id);
    if (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Create profile for a newly registered user.
 */
export async function createProfileForUserId(user_id: number, full_name: string, phone: string, birth_date: string): Promise<void> {
    const { error } = await databaseClient.from(PROFILES_TABLE).insert({user_id, full_name, phone, birth_date});
    if (error) {
        console.log(error);
        throw error;
    }
}