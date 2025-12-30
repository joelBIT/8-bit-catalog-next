import 'server-only';

import { eq } from 'drizzle-orm';
import { databaseClient } from './db';
import { Article } from '../_types/types';
import { articlesTable } from './schema/articles';
import { articleContentsTable } from './schema/article_contents';




/**
 * Send a GET request and retrieve all articles.
 */
export async function getAllArticles(): Promise<Article[]> {
    try {      
        const result = await databaseClient.query.articlesTable.findMany({
            with: {
                articleContents: true,  // Article content will be grouped as an array under the article
            }
        });

        return result;
    } catch (error) {
        console.log(error);
    }

    return [];
}

/**
 * Send a GET request and retrieve article.
 */
export async function getArticleById(articleId: number): Promise<Article> {
    try {
        const articles = await databaseClient.select().from(articlesTable).where(eq(articlesTable.id, articleId)).limit(1);

        if (articles.length !== 1) {
            console.log(`Could not find article with ID ${articleId}`);
            throw new Error(`Could not find article with ID ${articleId}`)
        }

        const contents = await databaseClient.select().from(articleContentsTable).where(eq(articleContentsTable.articleId, articleId));
        const article: Article = {...articles[0], articleContents: []};

        article.articleContents = contents;
        return article;
    } catch (error) {
        console.log(error);
        throw error;
    }
}