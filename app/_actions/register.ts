'use server';

import { createUserAndAccount } from "../_db/users-db";
import { hashPassword } from "../_session/password";
import { ActionState } from "../_types/types";

export async function register(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    const password = formData.get('password') as string;
    const passwordRepeat = formData.get('passwordRepeat') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const street = formData.get('street') as string;
    const city = formData.get('city') as string;
    const country = formData.get('country') as string;
    const fullName = formData.get('full_name') as string;
    const birthDate = formData.get('birth_date') as string;

    if (password !== passwordRepeat) {
        return { message: 'Passwords must be equal', success: false };
    }

    if (password.length < 8) {
        return { message: 'Password must be at least 8 characters', success: false };
    }

    if (!/\d/.test(password)) {
        return { message: 'Password must contain at least 1 number', success: false };
    }

    try {
        const passwordHash = await hashPassword(password);
        await createUserAndAccount(passwordHash, email, {userId: 0, phone, fullName, birthDate: new Date(birthDate)}, {userId: 0, street, city, country});       // TODO: userID is set to 0 because this value is not used in the function but required by the type. Fix this.
        
        return { message: 'Registration successful. Check email for activation link.', success: true };
    } catch (error) {
        if (error instanceof Error) {
            return { message: error.message, success: false };
        }
        return { message: 'Could not create account', success: false };
    }
}