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

export const ADDRESSES_TABLE = "addresses";
export const ARTICLES_TABLE = "articles"
export const FAVOURITES_TABLE = "favourites";
export const FAQ_TABLE = "faq";
export const FILTERS_TABLE = "filters";
export const GAMES_TABLE = "games";
export const NEWS_TABLE = "news";
export const NEWSLETTER_TABLE = "newsletter";
export const PROFILES_TABLE = "profiles";
export const SESSION_TABLE = "sessions";
export const TIMELINE_TABLE = "timeline";
export const USERS_TABLE = "users";
