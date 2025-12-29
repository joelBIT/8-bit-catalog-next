import 'server-only';

import { createClient } from '@supabase/supabase-js';

export const databaseClient = createClient(databaseURL(), databaseKey());

function databaseURL() {
    return process.env?.SUPABASE_URL as string;
}

function databaseKey() {
    return process.env?.SUPABASE_KEY as string;
}

export const ACCOUNTS_TABLE = "accounts";
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
