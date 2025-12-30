import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const addressesTable = pgTable('addresses', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().unique(),
    street: text('street').notNull().default(''),
    city: text('city').notNull().default(''),
    zipCode: text('zip_code').notNull().default(''),
    country: text('country').notNull().default(''),
    createdAt: timestamp('created_at').notNull().defaultNow()
});

export type InsertAddress = typeof addressesTable.$inferInsert;
export type SelectAddress = typeof addressesTable.$inferSelect;