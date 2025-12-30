import 'server-only';

import { eq } from 'drizzle-orm';
import { databaseClient } from './db';
import { Profile } from '../_types/types';
import { profilesTable } from './schema/profiles';
import { uploadFile } from './files-db';

const PROFILE_IMAGES_STORAGE = "catalog";


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

/**
 * The profile image is stored in a folder named as the user's id.
 */
export async function updateProfileImageById(id: number, image: File): Promise<void> {
    await uploadFile(image.name, image, PROFILE_IMAGES_STORAGE, id.toString() + "/");   // uploads the image file to a bucket.
    await updateUserImage(id, image.name);  // updates the image name since this name is used to reference the uploaded image file.
}

// Updates the name of the image used as a profile image. This image name is used to reference the image file stored in a bucket somewhere else.
async function updateUserImage(id: number, image: string): Promise<void> {
    await databaseClient.update(profilesTable).set({image}).where(eq(profilesTable.userId, id));
}