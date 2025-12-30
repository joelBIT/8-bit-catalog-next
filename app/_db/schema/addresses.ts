import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const addressesTable = pgTable('addresses', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().unique(),
    street: text('street'),
    city: text('city'),
    zipCode: text('zip_code'),
    country: text('country'),
    createdAt: timestamp('created_at').notNull().defaultNow()
});

export type InsertAddress = typeof addressesTable.$inferInsert;
export type SelectAddress = typeof addressesTable.$inferSelect;