import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { articlesTable } from './articles';

export const articleContentsTable = pgTable('article_contents', {
    id: serial('id').primaryKey(),
    heading: text('heading').notNull(),
    text: text('text').notNull(),
    articleId: integer('article_id').references(() => articlesTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow()
});

export const articlesRelations = relations(articleContentsTable, ({ one }) => ({
    article: one(articlesTable, {
        fields: [articleContentsTable.articleId],
        references: [articlesTable.id]
    })
}));

export type InsertArticleContent = typeof articleContentsTable.$inferInsert;
export type SelectArticleContent = typeof articleContentsTable.$inferSelect;