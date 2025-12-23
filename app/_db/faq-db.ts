import 'server-only';

import { databaseClient, FAQ_TABLE } from './db';
import { FrequentlyAskedQuestion } from '../_types/types';


/********
 * FAQs *
 *******/

export async function getFAQs(): Promise<FrequentlyAskedQuestion[]> {
    const { data, error } = await databaseClient.from(FAQ_TABLE).select();
    if (error) {
        console.log(error);
        throw error;
    }
  
    return data;
}