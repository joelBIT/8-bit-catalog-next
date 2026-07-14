import 'server-only';

import { eq } from 'drizzle-orm';
import { databaseClient } from './db';
import { users, User } from '@/app/_db/schema/auth/users';
import { InsertProfile, profilesTable } from './schema/profiles';
import { addressesTable, InsertAddress } from './schema/addresses';

/**
 * Retrieve all users.
 */
export async function getAllUsers(): Promise<User[]> {
    return await databaseClient.select().from(users);
}

export async function createAddressAndProfile(userId: string, profile: InsertProfile, address: InsertAddress): Promise<void> {
    await databaseClient.transaction(async (tx) => {
        await tx.update(profilesTable).set({...profile}).where(eq(profilesTable.userId, userId));
        await tx.update(addressesTable).set({...address}).where(eq(addressesTable.userId, userId));
    });
}