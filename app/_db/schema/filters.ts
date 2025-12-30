import { sql } from 'drizzle-orm';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const filtersTable = pgTable('filters', {
    id: serial('id').primaryKey(),
    categories: text('categories').array().notNull().default(sql`ARRAY[]::text[]`),
    developers: text('developers').array().notNull().default(sql`ARRAY[]::text[]`),
    publishers: text('publishers').array().notNull().default(sql`ARRAY[]::text[]`),
    createdAt: timestamp('created_at').notNull().defaultNow()
});

export type InsertFilter = typeof filtersTable.$inferInsert;
export type SelectFilter = typeof filtersTable.$inferSelect;

