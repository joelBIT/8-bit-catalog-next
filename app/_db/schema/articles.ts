import { sql } from 'drizzle-orm';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const articlesTable = pgTable('articles', {
    id: serial('id').primaryKey(),
    introduction: text('introduction').notNull(),
    title: text('title').notNull(),
    text: text('text').notNull(),
    image: text('image').notNull(),
    tags: text('tags').array().notNull().default(sql`ARRAY[]::text[]`),
    createdAt: timestamp('created_at').notNull().defaultNow()
});

export type InsertArticle = typeof articlesTable.$inferInsert;
export type SelectArticle = typeof articlesTable.$inferSelect;

