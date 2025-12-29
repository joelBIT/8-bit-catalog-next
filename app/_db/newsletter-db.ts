import 'server-only';

import { databaseClient, NEWSLETTER_TABLE } from './db';





/**
 * Adds the supplied email address to the list of newsletter subscribers.
 */
export async function subscribeNewsletter(email: string): Promise<void> {
    const { error } = await databaseClient.from(NEWSLETTER_TABLE).insert({ email });
    if (error) {
        console.log(error);

        if (error.code == '23505' && error.details.includes("email")) {
            throw new Error(`Already subscribed`);
        }

        throw error;
    }
}

/**
 * Return list of all email addresses that are subscribed for the newsletter.
 */
export async function getAllNewsletterSubscribers(): Promise<string[]> {
    const { data, error } = await databaseClient.from(NEWSLETTER_TABLE).select("email");
    if (error) {
        console.log(error);
        throw error;
    }

    return data.map(element => element.email);
}