'use server';

import { headers } from "next/headers";
import { ActionState } from "../_types/types";
import { auth } from "../auth";

export async function register(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    const password = formData.get('password') as string;
    const passwordRepeat = formData.get('passwordRepeat') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const street = formData.get('street') as string;
    const city = formData.get('city') as string;
    const country = formData.get('country') as string;
    const name = formData.get('full_name') as string;
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

    if (!name || name.length < 1) {
        return { message: 'Must supply a name', success: false };
    }

    try {
        const data = await auth.api.signUpEmail({
            body: {
                name,
                email,
                password
            },
            headers: await headers()        // This endpoint requires session cookies.
        });

        //await createAddressAndProfile(userId, email, {data.user.id, phone, birthDate: new Date(birthDate)}, {data.user.id, street, city, country});       // TODO: userID is set to 0 because this value is not used in the function but required by the type. Fix this.
        
        return { message: 'Registration successful. Check email for activation link.', success: true };
    } catch (error) {
        console.log(error);
        return { message: 'Could not create account', success: false };
    }
}