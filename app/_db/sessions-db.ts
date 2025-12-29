import 'server-only';

import { databaseClient, SESSION_TABLE } from './db';
import { Session } from '../_types/types';





/**
 * Creates a session when a user signs in.
 */
export async function storeSession(session: Session): Promise<void> {
    await databaseClient.from(SESSION_TABLE).insert(session);
}

export async function getSessionByTokenValue(value: string): Promise<Session> {
    const { data, error } = await databaseClient.from(SESSION_TABLE).select('expires_at, user_id, token_value').eq('token_value', value).single();
    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

/**
 * Deletes a user's session when the user signs out.
 */
export async function deleteSessionByTokenValue(token_value: string): Promise<void> {
    await databaseClient.from(SESSION_TABLE).delete().eq('token_value', token_value);
}

/**
 * The session is usually updated when it is refreshed (so it does not expire).
 */
export async function updateSession(session: Session): Promise<void> {
    await databaseClient.from(SESSION_TABLE).update(session);
}