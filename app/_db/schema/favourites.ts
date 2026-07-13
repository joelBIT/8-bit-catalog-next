import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { gamesTable } from './games';
import { user } from '@/auth-schema';

export const favouritesTable = pgTable('favourites', {
    id: serial('id').primaryKey(),
    gameId: integer('game_id').notNull().references(() => gamesTable.id),
    userId: integer('user_id').notNull().references(() => user.id),
    createdAt: timestamp('created_at').notNull().defaultNow()
});