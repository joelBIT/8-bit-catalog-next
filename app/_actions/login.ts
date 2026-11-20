'use server';

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { APIError } from "better-auth/api";
import { auth } from "@/app/auth";
import { ActionState } from "../_types/types";
import { URL_DASHBOARD_PAGE } from "../_utils/utils";

export async function login(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
                rememberMe: true
            },
            headers: await headers()
        });

    } catch (error) {
        console.log(error);
        if (error instanceof APIError && error.body?.code === 'EMAIL_NOT_VERIFIED') {
            return { message: 'Please verify your email first. We have sent you a new link.', success: false };
        }
        return { message: 'Could not log in', success: false };
    }

    revalidatePath('/', 'layout');
    redirect(URL_DASHBOARD_PAGE);
}