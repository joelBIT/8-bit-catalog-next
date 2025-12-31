import 'server-only';

import { eq, and } from 'drizzle-orm';
import { databaseClient, storageClient } from './db';
import { Account, accountsTable } from './schema/accounts';
import { usersTable } from './schema/users';
import { profilesTable } from './schema/profiles';
import { addressesTable } from './schema/addresses';


const PROFILE_IMAGES_STORAGE = "catalog";



/**
 * Copies the default profile image to the folder created for the newly registered user. The folder is named
 * after the registered user's id.
 */
export async function copyProfileImageToFolder(activationCode: string): Promise<void> {
    try {
        const response = await databaseClient.select().from(accountsTable).where(eq(accountsTable.activationCode, activationCode)).limit(1);
        await storageClient.storage.from(PROFILE_IMAGES_STORAGE).copy('profile.png', `${response[0]?.userId}/profile.png`);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Retrieve account information for user with supplied user ID.
 */
export async function getAccountByUserId(userId: number): Promise<Account> {
    const response = await databaseClient.select().from(accountsTable).where(eq(accountsTable.userId, userId)).limit(1);
    if (response?.length !== 1) {
        console.log(`Could not find account for user with ID ${userId}`);
        throw new Error(`Could not find account for user with ID ${userId}`);
    }
    return response[0];
}

/**
 * First a check is done to see if the activation code is valid. Then the corresponding account is activated.
 */
export async function activateAccount(activationCode: string): Promise<boolean> {
    const response = await databaseClient
        .select()
        .from(accountsTable)
        .where(and(eq(accountsTable.activationCode, activationCode), eq(accountsTable.activated, false)));
    if (response.length === 0) {
        return false;
    }

    await databaseClient.update(accountsTable).set({activated: true}).where(eq(accountsTable.activationCode, activationCode));    
    return true;
}

/**
 * Used by admin to create a user and account directly by bypassing the email activation procedure.
 */
export async function createActivatedAccount(userEmail: string, passwordHash: string, username: string): Promise<void> {
    await databaseClient.transaction(async (tx) => {
        const email = userEmail.toLowerCase();
        const user = await tx.insert(usersTable).values({email, passwordHash, username, role: "regular"})
            .returning({'id': usersTable.id, 'email': usersTable.email});
        
        const userId = user[0].id;
        await tx.insert(profilesTable).values({userId});
        await tx.insert(addressesTable).values({userId});

        await tx.insert(accountsTable).values({ userId, activated: true, activationCode: "created by admin" });
        await storageClient.storage.from(PROFILE_IMAGES_STORAGE).copy('profile.png', `${userId}/profile.png`);
    });
}
