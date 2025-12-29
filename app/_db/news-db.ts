import 'server-only';

import { databaseClient, NEWS_TABLE } from './db';
import { News } from '../_types/types';





/**
 * Retrieve all news.
 */
export async function getAllNews(): Promise<News[]> {
    const { data, error } = await databaseClient.from(NEWS_TABLE).select().order("date", { ascending: false });
    if (error) {
        console.log(error);
        throw error;
    }

    return data;
}

/**
 * Retrieve the 6 most viewed news.
 */
export async function getTopNews(): Promise<News[]> {
    const { data, error } = await databaseClient.from(NEWS_TABLE).select().limit(6).order("date", { ascending: false });
    if (error) {
        console.log(error);
        throw error;
    }

    return data;
}

/**
 * Get news with the supplied news ID.
 */
export async function getNewsById(id: number): Promise<News> {
    const { data, error } = await databaseClient.from(NEWS_TABLE).select().eq("id", id).single();
    if (error) {
        console.log(error);
        throw error;
    }

    return data;
}

/**
 * Create news with the supplied heading and text. The current date is stored as the date of when the news is published.
 */
export async function createNews(heading: string, text: string): Promise<void> {
    const { error } = await databaseClient.from(NEWS_TABLE).insert({ heading, text, date: new Date() });
    if (error) {
        console.log(error);
        throw error;
    }
}
