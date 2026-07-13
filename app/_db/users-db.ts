import 'server-only';

import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { databaseClient } from './db';
import { InsertProfile, profilesTable } from './schema/profiles';
import { addressesTable, InsertAddress } from './schema/addresses';
import { Resend } from 'resend';
import ActivationEmail from '../_components/email/ActivationEmail';
import { users, User } from '@/app/_db/schema/auth/users';


/**
 * Retrieve all users.
 */
export async function getAllUsers(): Promise<User[]> {
    return await databaseClient.select().from(users);
}

/**
 * Creates a user, profile, address, and account in a transaction when a registration of a new user occurs.
 * Email is used as lowercase in this system. This is to avoid users not being able 
 * to login/search members due to character(s) being mixed uppercase and lowercase. Also, as default the email is also stored as
 * the username since it is unique. A user can change the username to something else when logged in.
 */
export async function createAddressAndProfile(userId: number, userEmail: string, profile: InsertProfile, address: InsertAddress): Promise<void> {
    await databaseClient.transaction(async (tx) => {
        const email = userEmail.toLowerCase();
        // const user = await tx.insert(usersTable).values({email, passwordHash, username: email, role: "regular"})
        //     .returning({'id': usersTable.id, 'email': usersTable.email});
        
        // const userId = user[0].id;
        await tx.insert(profilesTable).values({...profile, userId});
        await tx.insert(addressesTable).values({...address, userId});
        const activationCode = uuidv4();
        //await tx.insert(accountsTable).values({ userId, activationCode });
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