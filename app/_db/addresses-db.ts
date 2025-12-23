import 'server-only';

import { ADDRESS_TABLE, databaseClient } from './db';
import { Address } from '../_types/types';



/***********
 * ADDRESS *
 **********/

export async function getAddressByUserId(user_id: number): Promise<Address> {
    const { data, error } = await databaseClient.from(ADDRESS_TABLE).select().eq('id', user_id).single();
    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export async function updateUserAddressById(id: number, street: string, city: string, country: string): Promise<void> {
    const { error } = await databaseClient.from(ADDRESS_TABLE).update({user_id: id, street, city, country}).eq('user_id', id);
    if (error) {
        console.log(error);
        throw error;
    }
}