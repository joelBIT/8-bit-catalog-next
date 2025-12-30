import { relations, sql } from 'drizzle-orm';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { articleContentsTable } from './article_contents';

export const articlesTable = pgTable('articles', {
    id: serial('id').primaryKey(),
    introduction: text('introduction').notNull(),
    title: text('title').notNull(),
    text: text('text').notNull(),
    image: text('image'),
    tags: text('tags').array().notNull().default(sql`ARRAY[]::text[]`),
    createdAt: timestamp('created_at').notNull().defaultNow()
});

export const contentsRelations = relations(articlesTable, ({ many }) => ({
    articles: many(articleContentsTable)
}));

export type InsertArticle = typeof articlesTable.$inferInsert;
export type SelectArticle = typeof articlesTable.$inferSelect;

