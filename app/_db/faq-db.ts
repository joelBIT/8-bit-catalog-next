import 'server-only';

import { databaseClient } from './db';
import { FrequentlyAskedQuestion } from '../_types/types';
import { faqTable } from './schema/faqs';



/**
 * Send a GET request and retrieve all FAQs.
 */
export async function getFAQs(): Promise<FrequentlyAskedQuestion[]> {
    return await databaseClient.select().from(faqTable);
}