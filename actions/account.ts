'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, signUp, sendMail } from "@/db/db";

export async function login(prevState: any, formData: FormData) {
    const loginData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
    };

    try {
       await signIn(loginData.email, loginData.password);
    } catch (error) {
        sendMail(loginData.email, "Failed login attempt", "Failed login attempt on 8bit Catalog");
        return { message: 'Could not log in', success: false };
    }

    revalidatePath('/', 'layout');
    redirect('/account');
}

export async function register(prevState: any, formData: FormData) {
    const registerData = {
        name: formData.get('username') as string,
        password: formData.get('password') as string,
        passwordRepeat: formData.get('passwordRepeat') as string,
        email: formData.get('email') as string
    };

    if (registerData.password !== registerData.passwordRepeat) {
        return { message: 'The entered passwords must be equal', success: false };
    }

    // validate data

    try {
        await signUp(registerData.email, registerData.password);
    } catch (error) {
        if (error instanceof Error) {
            return { message: error.message, success: false };
        }
        return { message: 'Could not create account', success: false };
    }

    return { message: 'Account was successfully created', success: true };
}