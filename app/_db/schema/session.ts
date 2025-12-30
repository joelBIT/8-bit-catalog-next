import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const sessionsTable = pgTable('sessions', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    tokenValue: text('token_value').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
});

export type InsertSession = typeof sessionsTable.$inferInsert;
export type SelectSession = typeof sessionsTable.$inferSelect;

