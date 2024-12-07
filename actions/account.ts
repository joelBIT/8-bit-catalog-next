'use server';

import { signIn, signUp } from "@/db/db";
import { AuthWeakPasswordError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
    const loginData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
    };

    try {
       await signIn(loginData.email, loginData.password); 
    } catch (error) {
        return { message: 'Could not log in' };
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
        console.log(error);
        if (error instanceof Error) {
            return { message: error.message, success: false };
        }
        return { message: 'Could not register account', success: false };
    }

    return { message: 'Account was successfully created', success: true };
}