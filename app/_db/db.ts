import 'server-only';

import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { createClient } from '@supabase/supabase-js';

const connectionString = process.env.DATABASE_URL!;


// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false })

//const allUsers = await db.select().from(users);

export const databaseClient = drizzle(client);      // Used for communication with the database (containing metadata)

export const storageClient = createClient(databaseURL(), databaseKey());    // Used for communication with storage (containing images/files)

function databaseURL() {
    return process.env?.SUPABASE_URL as string;
}

function databaseKey() {
    return process.env?.SUPABASE_KEY as string;
}




export const USERS_TABLE = "users";
