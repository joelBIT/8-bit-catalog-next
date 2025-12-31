import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const newsletterTable = pgTable('newsletter', {
    id: serial('id').primaryKey(),
    email: text('email').notNull().unique(),        // People may subscribe to the newsletter without having an account.
    createdAt: timestamp('created_at').notNull().defaultNow()
});