import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from '@/app/_db/schema/auth/users';

export const addressesTable = pgTable('addresses', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull().unique().references(() => users.id),
    street: text('street').notNull().default(''),
    city: text('city').notNull().default(''),
    zipCode: text('zip_code').notNull().default(''),
    country: text('country').notNull().default(''),
    createdAt: timestamp('created_at').notNull().defaultNow()
});

export type Address = typeof addressesTable.$inferSelect;
export type InsertAddress = typeof addressesTable.$inferInsert;