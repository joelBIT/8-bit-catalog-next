import 'server-only';

import { desc, eq } from 'drizzle-orm';
import { databaseClient } from './db';
import { News } from '../_types/types';
import { newsTable } from './schema/news';





/**
 * Retrieve all news.
 */
export async function getAllNews(): Promise<News[]> {
    return await databaseClient.select().from(newsTable).orderBy(desc(newsTable.createdAt));
}

/**
 * Retrieve the 6 most viewed news.
 */
export async function getTopNews(): Promise<News[]> {
    return await databaseClient.select().from(newsTable).limit(6).orderBy(desc(newsTable.createdAt));
}

/**
 * Get news with the supplied news ID.
 */
export async function getNewsById(id: number): Promise<News> {
    const response = await databaseClient.select().from(newsTable).where(eq(newsTable.id, id)).limit(1);
    if (response.length !== 1) {
        console.log(`Could not find news with ID ${id}`);
        throw new Error(`Could not find news with ID ${id}`)
    }

    return response[0];
}

/**
 * Create news with the supplied heading and text. The current date is stored as the date of when the news is published.
 */
export async function createNews(heading: string, text: string): Promise<void> {
    await databaseClient.insert(newsTable).values({ heading, text, published: new Date().toString(), author: 'Joel Rollny', image: 'keyboard.avif' });
}
