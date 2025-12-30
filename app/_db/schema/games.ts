import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const gamesTable = pgTable('games', {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    title: text('title').notNull(),
    players: integer('players').notNull(),
    publisher: text('publisher').notNull(),
    developer: text('developer').notNull(),
    category: text('category').notNull(),
    releaseDate: text('release_date').notNull(),
    cover: text('cover').notNull(),
    description: text('description').notNull(),
    rom: boolean('rom').notNull()
});

export type InsertGame = typeof gamesTable.$inferInsert;
export type SelectGame = typeof gamesTable.$inferSelect;