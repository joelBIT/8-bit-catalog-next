import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from '@/app/_db/schema/auth/users';

export const addressesTable = pgTable('addresses', {
    id: serial('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .unique()
        .references(() => users.id, { onDelete: "cascade" }),
    street: text('street').default(''),
    city: text('city').default(''),
    zipCode: text('zip_code').default(''),
    country: text('country').default(''),
    createdAt: timestamp('created_at')
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at')
        .$onUpdate(() => /* @__PURE__ */ new Date())
});

export type Address = typeof addressesTable.$inferSelect;
export type InsertAddress = typeof addressesTable.$inferInsert;

export const addressesRelations = relations(addressesTable, ({ one }) => ({
    users: one(users, {
        fields: [addressesTable.userId],
        references: [users.id]
    })
}));