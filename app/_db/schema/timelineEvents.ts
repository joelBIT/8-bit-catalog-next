import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const timelineEventsTable = pgTable('timeline', {
    id: serial('id').primaryKey(),
    year: integer('year').notNull(),
    text: text('text').notNull(),
    image: text('image').notNull(),
    title: text('title').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
});

export type InsertTimelineEvent = typeof timelineEventsTable.$inferInsert;
export type SelectTimeLineEvent = typeof timelineEventsTable.$inferSelect;

