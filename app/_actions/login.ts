'use server';

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/app/auth";
import { ActionState } from "../_types/types";
import { URL_DASHBOARD_PAGE } from "../_utils/utils";

export async function login(_prevState: ActionState, formData: FormData): Promise<ActionState | undefined> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        const data = await auth.api.signInEmail({
            body: {
                email,
                password,
                rememberMe: true,
                callbackURL: `${process.env.DOMAIN_URL}/${URL_DASHBOARD_PAGE}`
            },
            headers: await headers()        // This endpoint requires session cookies.
        });
    } catch (error) {
        console.log(error);
        return { message: 'Could not log in', success: false };
    }

    revalidatePath('/', 'layout');
}