'use server';

import { headers } from "next/headers";
import { ActionState } from "../_types/types";
import { auth } from "../auth";
import { createAddressAndProfile } from "../_db/users-db";

export async function register(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    const password = formData.get('password') as string;
    const passwordRepeat = formData.get('passwordRepeat') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const street = formData.get('street') as string;
    const city = formData.get('city') as string;
    const country = formData.get('country') as string;
    const name = formData.get('name') as string;
    let birthDateValue: string | null = formData.get('birth_date') as string;

    if (birthDateValue.length == 0 || birthDateValue.includes("null")) {
        birthDateValue = null;
    }

    if (password !== passwordRepeat) {
        return { message: 'Passwords must be equal', success: false };
    }

    if (password.length < 8) {
        return { message: 'Password must be at least 8 characters', success: false };
    }

    if (!/\d/.test(password)) {
        return { message: 'Password must contain at least 1 number', success: false };
    }

    if (!name || name.length < 1) {
        return { message: 'Must supply a name', success: false };
    }

    try {
        const data = await auth.api.signUpEmail({       // TODO: Handle when user trying to sign up with existing email and other problems
            body: {
                name,
                email,
                password
            },
            headers: await headers()        // This endpoint requires session cookies.
        });

        await createAddressAndProfile(data.user.id, {userId: data.user.id, phone, birthDate: birthDateValue ? new Date(birthDateValue) : null}, {userId: data.user.id, street, city, country});
        return { message: 'If this email can be used, an activation link has been sent. Check your inbox.', success: true };
    } catch (error) {
        console.log(error);
        return { message: 'Could not create account', success: false };
    }
}