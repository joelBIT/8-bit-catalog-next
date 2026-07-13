import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
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
    birthDate: timestamp('birth_date'),
    phone: text('phone').default(''),
    bio: text('bio').default(''),
    createdAt: timestamp('created_at')
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at')
        .$onUpdate(() => /* @__PURE__ */ new Date())
});

export type InsertProfile = typeof profilesTable.$inferInsert;
export type Profile = typeof profilesTable.$inferSelect;

export const profilesRelations = relations(profilesTable, ({ one }) => ({
    users: one(users, {
        fields: [profilesTable.userId],
        references: [users.id]
    })
}));