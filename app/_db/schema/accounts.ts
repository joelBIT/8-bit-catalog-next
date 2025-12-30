import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const accountsTable = pgTable('accounts', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().unique(),
    activationCode: text('activation_code').notNull().unique(),
    failedLoginAttempts: integer('failed_login_attempts'),
    activated: boolean('activated').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    lastLogin: timestamp('last_login')
        .notNull()
        .$onUpdate(() => new Date()),
});

export type InsertAccount = typeof accountsTable.$inferInsert;
export type SelectAccount = typeof accountsTable.$inferSelect;