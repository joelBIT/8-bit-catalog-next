import 'server-only';

import { ADDRESS_TABLE, databaseClient } from './db';
import { Address } from '../_types/types';


/**
 * Retrieve the addess for user with supplied user ID.
 */
export async function getAddressByUserId(user_id: number): Promise<Address> {
    const { data, error } = await databaseClient.from(ADDRESS_TABLE).select().eq('user_id', user_id).single();
    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

/**
 * Update address for user with supplied user ID.
 */
export async function updateAddressByUserId(address: Address): Promise<void> {
    const { error } = await databaseClient.from(ADDRESS_TABLE).update({...address}).eq('user_id', address.user_id);
    if (error) {
        console.log(error);
        throw error;
    }
}