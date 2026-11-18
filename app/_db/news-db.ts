import 'server-only';

import { desc, eq } from 'drizzle-orm';
import { databaseClient } from './db';
import { News, newsTable } from './schema/news';





/**
 * Retrieve all news.
 */
export async function getAllNews(): Promise<News[]> {
    return await databaseClient.select().from(newsTable).orderBy(desc(newsTable.published));
}

/**
 * Retrieve the 6 most viewed news.
 */
export async function getTopNews(): Promise<News[]> {
    return await databaseClient.select().from(newsTable).limit(4).orderBy(desc(newsTable.published));
}

/**
 * Get news with the supplied news ID.
 */
export async function getNewsById(id: number): Promise<News | undefined> {
    const [news] = await databaseClient.select().from(newsTable).where(eq(newsTable.id, id)).limit(1);
    return news;
}

/**
 * Create news with the supplied heading and text. The current date is stored as the date of when the news is published.
 */
export async function createNews(heading: string, text: string): Promise<void> {
    await databaseClient.insert(newsTable).values({ heading, text, published: new Date().toString(), author: 'Joel Rollny', image: 'keyboard.avif' });
}
