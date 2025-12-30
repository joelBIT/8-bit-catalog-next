import { date, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const profilesTable = pgTable('profiles', {
    id: serial('id').primaryKey(),
    lastName: text('last_name'),
    firstName: text('first_name'),
    image: text('image'),
    fullName: text('full_name'),
    birthDate: date('birth_date'),
    phone: text('phone'),
    bio: text('bio'),
    createdAt: timestamp('created_at').notNull().defaultNow()
});

export type InsertProfile = typeof profilesTable.$inferInsert;
export type SelectProfile = typeof profilesTable.$inferSelect;

