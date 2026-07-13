import 'server-only';

import { databaseClient } from './db';
import { users, User } from '@/app/_db/schema/auth/users';

/**
 * Retrieve all users.
 */
export async function getAllUsers(): Promise<User[]> {
    return await databaseClient.select().from(users);
}