import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const faqTable = pgTable('faq', {
    id: serial('id').primaryKey(),
    type: text('type').notNull(),
    question: text('question').notNull(),
    answer: text('answer').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
});

export type InsertFAQ = typeof faqTable.$inferInsert;
export type SelectFAQ = typeof faqTable.$inferSelect;

