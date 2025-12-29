import 'server-only';

import { databaseClient, TIMELINE_TABLE } from './db';
import { TimelineEvent } from '../_types/types';


/**
 * Get timeline (contains information about specific years in the history of the NES).
 */
export async function getTimeline(): Promise<TimelineEvent[]> {
    const { data, error } = await databaseClient.from(TIMELINE_TABLE).select().order("year");
    if (error) {
        console.log(error);
        throw error;
    }
  
    return data;
}