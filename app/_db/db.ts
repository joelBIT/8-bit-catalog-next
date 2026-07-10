import 'server-only';

import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

const connectionString = process.env.DATABASE_URL!;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false })

export const databaseClient = drizzle(client);      // Used for communication with the database (containing metadata)

export function databaseURL() {
    return process.env?.SUPABASE_URL as string;
}

export function databaseKey() {
    return process.env?.SUPABASE_KEY as string;
}