import { index, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const contactRequestsTable = pgTable('contact_requests', {
    id: serial('id').primaryKey(),
    ipAddress: text('ip_address').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
}, (table) => [index('contact_requests_ip_created_idx').on(table.ipAddress, table.createdAt)]);