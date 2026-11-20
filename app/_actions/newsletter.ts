'use server';

import { z } from "zod";
import { ActionState } from "@/app/_types/types";
import { subscribeNewsletter } from "../_db/newsletter-db";

const emailSchema = z.email('Enter a valid email address').max(254);

/**
 * Creates a newsletter subscription for the supplied email. It is not required to have an account. A person only needs to enter an email
 * address and click on the 'subscribe' button.
 */
export async function createNewsletterSubscription(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    const parsed = emailSchema.safeParse(String(formData.get('email') ?? '').trim());
    if (!parsed.success) {
        return { message: parsed.error.issues[0].message, success: false };
    }

    try {
        await subscribeNewsletter(parsed.data);
        return { message: `${parsed.data} subscribed`, success: true };
    } catch (error) {
        console.log(error);
        return { message: 'Subscription failed', success: false };
    }
}