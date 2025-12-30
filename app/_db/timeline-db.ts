import 'server-only';

import { asc } from 'drizzle-orm';
import { databaseClient } from './db';
import { TimelineEvent } from '../_types/types';
import { timelineEventsTable } from './schema/timelineEvents';


/**
 * Get timeline (contains information about specific years in the history of the NES).
 */
export async function getTimeline(): Promise<TimelineEvent[]> {
    return await databaseClient.select().from(timelineEventsTable).orderBy(asc(timelineEventsTable.year));
}