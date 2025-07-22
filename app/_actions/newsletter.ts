'use server';

import { ActionState } from "@/app/_types/types";
import { subscribeNewsletter } from "@/app/_db/db";

/**
 * Creates a newsletter subscription for the supplied email. It is not required to have an account. A person only needs to enter an email
 * address and click on the 'subscribe' button.
 */
export async function createNewsletterSubscription(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    const email = formData.get('email') as string;
    if (!email) {
        return { message: 'An email address is required', success: false };
    }

    try {
        await subscribeNewsletter(email);

        return { message: `${email} subscribed`, success: true };
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return { message: error.message, success: false };
        }

        return { message: 'Subscription was not successful', success: false };
    }
}