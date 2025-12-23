import 'server-only';

import { databaseClient, NEWSLETTER_TABLE } from './db';




/**************
 * NEWSLETTER *
 *************/

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

export async function getAllNewsletterSubscribers(): Promise<string[]> {
    const { data, error } = await databaseClient.from(NEWSLETTER_TABLE).select("email");
    if (error) {
        console.log(error);
        throw error;
    }

    return data.map(element => element.email);
}