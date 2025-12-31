import 'server-only';

import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { databaseClient } from './db';
import { User, usersTable } from './schema/users';
import { InsertProfile, profilesTable } from './schema/profiles';
import { addressesTable, InsertAddress } from './schema/addresses';
import { Resend } from 'resend';
import ActivationEmail from '../_components/email/ActivationEmail';
import { accountsTable } from './schema/accounts';



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

/**
 * Creates a user, profile, address, and account in a transaction when a registration of a new user occurs.
 * Email is used as lowercase in this system. This is to avoid users not being able 
 * to login/search members due to character(s) being mixed uppercase and lowercase. Also, as default the email is also stored as
 * the username since it is unique. A user can change the username to something else when logged in.
 */
export async function createUserAndAccount(passwordHash: string, userEmail: string, profile: InsertProfile, address: InsertAddress): Promise<void> {
    await databaseClient.transaction(async (tx) => {
        const email = userEmail.toLowerCase();
        const user = await tx.insert(usersTable).values({email, passwordHash, username: email, role: "regular"})
            .returning({'id': usersTable.id, 'email': usersTable.email});
        
        const userId = user[0].id;
        await tx.insert(profilesTable).values({...profile, userId});
        await tx.insert(addressesTable).values({...address, userId});
        const activationCode = uuidv4();
        await tx.insert(accountsTable).values({ userId, activationCode });
        sendActivationMail(email, activationCode);
    });
}

/**
 * Sends an email containing a link with the activation code to the supplied email address.
 */
async function sendActivationMail(email: string, activationCode: string): Promise<void> {
    const resend = new Resend(process.env.RESEND_API_KEY as string);

    await resend.emails.send({
        from: '8bit <onboarding@joel-rollny.eu>',
        to: email,
        subject: 'Finish registration',
        react: ActivationEmail(activationCode),
    });
}