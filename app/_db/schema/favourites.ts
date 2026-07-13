import { integer, pgTable, serial, timestamp, text } from 'drizzle-orm/pg-core';
import { gamesTable } from './games';
import { users } from '@/app/_db/schema/auth/users';

export const favouritesTable = pgTable('favourites', {
    id: serial('id').primaryKey(),
    gameId: integer('game_id').notNull().references(() => gamesTable.id),
    userId: text('user_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at').notNull().defaultNow()
});