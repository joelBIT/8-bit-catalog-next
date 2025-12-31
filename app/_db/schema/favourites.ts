import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './users';
import { gamesTable } from './games';

export const favouritesTable = pgTable('favourites', {
    id: serial('id').primaryKey(),
    gameId: integer('game_id').notNull().references(() => gamesTable.id),
    userId: integer('user_id').notNull().references(() => usersTable.id),
    createdAt: timestamp('created_at').notNull().defaultNow()
});