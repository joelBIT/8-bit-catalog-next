import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { articlesTable } from './articles';

export const articleContentsTable = pgTable('article_contents', {
    id: serial('id').primaryKey(),
    heading: text('heading').notNull(),
    text: text('text').notNull(),
    articleId: integer('article_id').notNull().references(() => articlesTable.id),
    createdAt: timestamp('created_at').notNull().defaultNow()
});

export type ArticleContent = typeof articleContentsTable.$inferInsert;