import { date, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const newsTable = pgTable('news', {
    id: serial('id').primaryKey(),
    heading: text('heading').notNull(),
    text: text('text').notNull(),
    published: date('published').notNull().defaultNow(),
    image: text('image').notNull(),
    author: text('author').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
});

export type InsertNews = typeof newsTable.$inferInsert;
export type SelectNews = typeof newsTable.$inferSelect;

