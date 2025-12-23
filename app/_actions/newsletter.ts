'use server';

import { ActionState } from "@/app/_types/types";
import { isAuthenticatedAdmin } from "@/app/_session/utils";
import { subscribeNewsletter } from "../_db/newsletter-db";
import { createNews } from "../_db/news-db";

/**
 * Creates a newsletter subscription for the supplied email. It is not required to have an account. A person only needs to enter an email
 * address and click on the 'subscribe' button.
 */
export async function createNewsletterSubscription(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    const email = formData.get('email') as string;
    if (!email) {
        return { message: 'Email required', success: false };
    }

    try {
        await subscribeNewsletter(email);

        return { message: `${email} subscribed`, success: true };
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return { message: error.message, success: false };
        }

        return { message: 'Subscription failed', success: false };
    }
}

/**
 * Create news. It is possible to send out news as a newsletter. Only Admin is allowed to create news.
 */
export async function createNewsAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    const isAdmin = await isAuthenticatedAdmin();
    if (!isAdmin) {
        return { message: 'Only admins may create news', success: false };
    }

    const heading = formData.get('heading') as string;
    const text = formData.get('message') as string;
    if (!heading || !text) {
        return { message: 'Heading and text are required', success: false };
    }

    try {
        await createNews(heading, text);

        return { message: 'The news was successfully created', success: true };
    } catch (error) {
        console.log(error);

        if (error instanceof Error) {
            return { message: error.message, success: false };
        }
        return { message: 'The news could not be created', success: false };
    }
}