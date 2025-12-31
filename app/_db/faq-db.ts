import 'server-only';

import { databaseClient } from './db';
import { faqTable, FrequentlyAskedQuestion } from './schema/faqs';



/**
 * Send a GET request and retrieve all FAQs.
 */
export async function getFAQs(): Promise<FrequentlyAskedQuestion[]> {
    return await databaseClient.select().from(faqTable);
}