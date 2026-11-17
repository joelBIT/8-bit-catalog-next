import 'server-only';

import { and, count, eq, gt, lt } from 'drizzle-orm';
import { databaseClient } from './db';
import { contactRequestsTable } from './schema/contact_requests';

export async function countRecentContactRequests(ipAddress: string, since: Date): Promise<number> {
    const [row] = await databaseClient
        .select({ value: count() })
        .from(contactRequestsTable)
        .where(and(eq(contactRequestsTable.ipAddress, ipAddress), gt(contactRequestsTable.createdAt, since)));
    return row.value;
}

export async function recordContactRequest(ipAddress: string): Promise<void> {
    await databaseClient.insert(contactRequestsTable).values({ ipAddress });
    // Housekeeping: rows older than a day are no longer needed for the limit
    await databaseClient.delete(contactRequestsTable).where(lt(contactRequestsTable.createdAt, new Date(Date.now() - 24 * 60 * 60 * 1000)));
}