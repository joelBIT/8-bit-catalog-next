import 'server-only';

import { eq } from 'drizzle-orm';
import { databaseClient } from './db';
import { Session } from '../_types/types';
import { sessionsTable } from './schema/sessions';





/**
 * Creates a session when a user signs in.
 */
export async function storeSession(session: Session): Promise<void> {
    await databaseClient.insert(sessionsTable).values(session);
}

export async function getSessionByTokenValue(value: string): Promise<Session> {
    const response = await databaseClient
        .select()
        .from(sessionsTable)
        .where(eq(sessionsTable.tokenValue, value))
        .limit(1);
    if (response?.length !== 1) {
        console.log(`Could not find session for token value ${value}`);
        throw new Error(`Could not find session for token value ${value}`)
    }

    return response[0];
}

/**
 * Deletes a user's session when the user signs out.
 */
export async function deleteSessionByTokenValue(tokenValue: string): Promise<void> {
    await databaseClient.delete(sessionsTable).where(eq(sessionsTable.tokenValue, tokenValue));
}

/**
 * The session is usually updated when it is refreshed (so it does not expire).
 */
export async function updateSession(session: Session): Promise<void> {
    await databaseClient.update(sessionsTable).set(session);
}