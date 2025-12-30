import 'server-only';

import { eq } from 'drizzle-orm';
import { databaseClient, PROFILES_TABLE } from './db';
import { Profile } from '../_types/types';
import { profilesTable } from './schema/profiles';




/**
 * Retrieve profile information about the user with supplied user ID.
 */
export async function getProfileByUserId(userId: number): Promise<Profile> {
    const response = await databaseClient.select().from(profilesTable).where(eq(profilesTable.userId, userId)).limit(1);
    if (response?.length !== 1) {
        console.log(`Could not find profile for user with ID ${userId}`);
        throw new Error(`Could not find profile for user with ID ${userId}`)
    }
    return response[0];
}

/**
 * Update profile for user with supplied user ID.
 */
export async function updateProfileByUserId(profile: Profile): Promise<void> {
    await databaseClient.update(profilesTable).set({...profile}).where(eq(profilesTable.userId, profile.userId));
}

/**
 * Create profile for a newly registered user.
 */
export async function createProfileForUserId(userId: number, fullName: string, phone: string, birthDate: Date): Promise<void> {
    await databaseClient.insert(profilesTable).values({userId, fullName, phone, birthDate});
}