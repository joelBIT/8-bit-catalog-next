'use server';

import { hashPassword } from "@/app/_session/password";
import { isAuthenticatedAdmin } from "@/app/_session/sessionUtils";
import { ActionState } from "@/app/_types/types";
import { createActivatedAccount } from "../_db/accounts-db";

/**
 * Used by admin to create a new user and account by bypassing the email verification process. There are no
 * restrictions on the password when adding a user as admin.
 */
export async function createUserAndAccountAsAdmin(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    const isAdmin = await isAuthenticatedAdmin();
    if (!isAdmin) {
        return { message: 'Only admins may create accounts', success: false };
    }

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    let username = formData.get('username') as string;
    if (!username) {
        username = email;       // Set username same as email if username is missing since email is unique
    }

    try {
        const passwordHash = await hashPassword(password);
        await createActivatedAccount(email, passwordHash, username);

        return { message: 'The account was successfully created', success: true };
    } catch (error) {
        console.log(error);

        if (error instanceof Error) {
            return { message: error.message, success: false };
        }
        return { message: 'The account could not be created', success: false };
    }
}