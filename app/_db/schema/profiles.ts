import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, date } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { users } from '@/app/_db/schema/auth/users';

export const profilesTable = pgTable('profiles', {
    id: serial('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .unique()
        .references(() => users.id, { onDelete: "cascade" }),
    lastName: text('last_name').default(''),
    firstName: text('first_name').default(''),
    image: text('image').notNull().default(''),
    birthDate: date('birth_date', { mode: "date" }),
    phone: text('phone').default(''),
    bio: text('bio').default(''),
    createdAt: timestamp('created_at')
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at')
        .$onUpdate(() => /* @__PURE__ */ new Date())
});

export const profilesRelations = relations(profilesTable, ({ one }) => ({
    users: one(users, {
        fields: [profilesTable.userId],
        references: [users.id]
    })
}));

export const insertProfileSchema = createInsertSchema(profilesTable);
export const selectProfileSchema = createSelectSchema(profilesTable);

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = z.infer<typeof selectProfileSchema>;