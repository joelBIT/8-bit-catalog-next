import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';

export const favouritesTable = pgTable('favourites', {
    id: serial('id').primaryKey(),
    gameId: integer('game_id').notNull(),
    userId: integer('user_id').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
});

export type InsertFavourite = typeof favouritesTable.$inferInsert;
export type SelectFavourite = typeof favouritesTable.$inferSelect;

