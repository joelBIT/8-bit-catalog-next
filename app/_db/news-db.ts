import 'server-only';

import { databaseClient, NEWS_TABLE } from './db';
import { News } from '../_types/types';




/********
 * NEWS *
 *******/

export async function getAllNews(): Promise<News[]> {
    const { data, error } = await databaseClient.from(NEWS_TABLE).select("id, heading, text, date, image, author").order("date", { ascending: false });
    if (error) {
        console.log(error);
        throw error;
    }

    return data;
}

export async function getTopNews(): Promise<News[]> {
    const { data, error } = await databaseClient.from(NEWS_TABLE).select("id, heading, text, date, image, author").limit(6).order("date", { ascending: false });
    if (error) {
        console.log(error);
        throw error;
    }

    return data;
}

export async function getNewsById(id: number): Promise<News> {
    const { data, error } = await databaseClient.from(NEWS_TABLE).select("id, heading, text, date, image, author").eq("id", id).single();
    if (error) {
        console.log(error);
        throw error;
    }

    return data;
}

export async function createNews(heading: string, text: string): Promise<void> {
    const { error } = await databaseClient.from(NEWS_TABLE).insert({ heading, text, date: new Date() });
    if (error) {
        console.log(error);
        throw error;
    }
}
