import 'server-only';

import { eq } from 'drizzle-orm';
import { User } from '@/app/_types/types';
import { databaseClient } from './db';
import { usersTable } from './schema/users';





/**
 * Creates a user in the user table and returns the newly created user. Emails are unique so an error will be thrown in case the
 * email already exists in the user table. Email is used as lowercase in this system. This is to avoid users not being able 
 * to login/search members due to character(s) being mixed uppercase and lowercase. Also, as default the email is also stored as
 * the username since it is unique. A user can change the username to something else when logged in.
 */
export async function registerUser(userEmail: string, passwordHash: string, username: string): Promise<{id: number, email: string}> {
    const email = userEmail.toLowerCase();
    const response = await databaseClient
        .insert(usersTable)
        .values({email, passwordHash, username, role: "regular"})
        .returning({'id': usersTable.id, 'email': usersTable.email});

    return {id: response[0].id, email: email};
}

/**
 * Email is used as lowercase in this system. This is to avoid users not being able to login/search members due to character(s) being mixed
 * uppercase and lowercase.
 */
export async function getUserByEmail(email: string): Promise<User> {
    const lowerCaseEmail = email.toLowerCase();
    const response = await databaseClient.select().from(usersTable).where(eq(usersTable.email, lowerCaseEmail)).limit(1);
    if (response?.length !== 1) {
        console.log(`Could not find user with email ${email}`);
        throw new Error(`Could not find user with email ${email}`)
    }

    return response[0];
}

/**
 * Retrieve user with supplied user ID.
 */
export async function getUserById(userId: number): Promise<User> {
    const response = await databaseClient.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
    if (response?.length !== 1) {
        console.log(`Could not find user with ID ${userId}`);
        throw new Error(`Could not find user with ID ${userId}`)
    }

    return response[0];
}

/**
 * Retrieve all users.
 */
export async function getAllUsers(): Promise<User[]> {
    return await databaseClient.select().from(usersTable);
}

/**
 * Update password by replacing the existing password hash with the hash of the new password.
 */
export async function updatePasswordByUserId(id: number, passwordHash: string): Promise<void> {
    await databaseClient.update(usersTable).set({passwordHash}).where(eq(usersTable.id, id));
}

/**
 * Update email address for user with supplied user ID.
 */
export async function updateEmailByUserId(id: number, email: string): Promise<void> {
    await databaseClient.update(usersTable).set({email}).where(eq(usersTable.id, id));
}

/**
 * Update username for the user with the matching userId.
 */
export async function updateUsernameByUserId(userId: number, username: string): Promise<void> {
    await databaseClient.update(usersTable).set({username}).where(eq(usersTable.id, userId));
}

/**
 * Update password hash for the account that corresponds to the supplied email.
 */
export async function updateUserPassword(email: string, passwordHash: string): Promise<void> {
    await databaseClient.update(usersTable).set({passwordHash}).where(eq(usersTable.email, email));
}

/**
 * Check if a user with the supplied email exists.
 */
export async function emailExists(email: string): Promise<boolean> {
    try {
        const response = await databaseClient.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
        if (response.length === 1) {
            return true;
        }
    } catch (error) {
        console.log(error);
    }

    return false;
}

/**
 * Check if supplied password hash is a match for the given email address.
 */
export async function isCurrentPassword(email: string, passwordHash: string): Promise<boolean> {
    const response = await databaseClient.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (response.length !== 1) {
        console.log(`Could not find user with email ${email}`);
        throw new Error(`Could not find user with email ${email}`)
    }

    return response[0].passwordHash === passwordHash;
}