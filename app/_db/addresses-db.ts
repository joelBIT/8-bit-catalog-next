import 'server-only';

import { eq } from 'drizzle-orm';
import { databaseClient } from './db';
import { Address } from '../_types/types';
import { addressesTable } from './schema/addresses';


/**
 * Retrieve the addess for user with supplied user ID.
 */
export async function getAddressByUserId(userId: number): Promise<Address> {
    const response = await databaseClient.select().from(addressesTable).where(eq(addressesTable.userId, userId)).limit(1);
    if (response?.length !== 1) {
        console.log(`Could not find address for user with ID ${userId}`);
        throw new Error(`Could not find address for user with ID ${userId}`)
    }
    return response[0];
}

/**
 * Update address for user with supplied user ID.
 */
export async function updateAddressByUserId(address: Address): Promise<void> {
    await databaseClient.update(addressesTable).set({...address}).where(eq(addressesTable.userId, address.userId));
}

/**
 * Create address for a newly registered user.
 */
export async function createAddressForUserId(address: Address): Promise<void> {
    await databaseClient.insert(addressesTable).values({...address});
}