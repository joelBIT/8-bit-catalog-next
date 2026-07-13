import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { user } from '@/auth-schema';

export const profilesTable = pgTable('profiles', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => user.id),
    lastName: text('last_name').notNull().default(''),
    firstName: text('first_name').notNull().default(''),
    image: text('image').notNull().default(''),
    fullName: text('full_name').notNull().default(''),
    birthDate: timestamp('birth_date'),
    phone: text('phone').notNull().default(''),
    bio: text('bio').notNull().default(''),
    createdAt: timestamp('created_at').notNull().defaultNow()
});

export type InsertProfile = typeof profilesTable.$inferInsert;
export type Profile = typeof profilesTable.$inferSelect;