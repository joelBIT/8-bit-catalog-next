import 'server-only';

import { databaseClient } from './db';
import { newsletterTable } from './schema/newsletter';





/**
 * Adds the supplied email address to the list of newsletter subscribers.
 */
export async function subscribeNewsletter(email: string): Promise<void> {
    try {
        await databaseClient.insert(newsletterTable).values({ email });
    } catch (error) {
        console.log(error);
        throw new Error(`Could not subscribe`);
    }
}

/**
 * Return list of all email addresses that are subscribed for the newsletter.
 */
export async function getAllNewsletterSubscribers(): Promise<string[]> {
    const response = await databaseClient.select({ "email": newsletterTable.email}).from(newsletterTable);
    if (response) {
        return response.map(element => element.email);
    }

    return [];
}