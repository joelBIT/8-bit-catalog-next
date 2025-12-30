import 'server-only';

import { eq } from 'drizzle-orm';
import { ARTICLES_TABLE, databaseClient } from './db';
import { Article } from '../_types/types';
import { articlesTable } from './schema/articles';
import { articleContentsTable } from './schema/article_contents';




/**
 * Send a GET request and retrieve all articles.
 */
export async function getAllArticles(): Promise<Article[]> {
    try {
        const response = await databaseClient.select().from(articlesTable).leftJoin(articleContentsTable, eq(articlesTable.id, articleContentsTable.articleId));

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }

    return [];
}

/**
 * Send a GET request and retrieve article.
 */
export async function getArticleById(id: number): Promise<Article> {
    try {
        const { data } = await databaseClient.from(ARTICLES_TABLE).select(`
            id,
            title,
            tags,
            introduction,
            text,
            image,
            article_contents (
                heading,
                text
            )
        `).eq("id", id).single();

        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error);
    }

    throw new Error(`Could not find article with id ${id}`);
}