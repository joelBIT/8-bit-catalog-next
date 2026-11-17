import { integer, pgTable, serial, timestamp, text, unique, index } from 'drizzle-orm/pg-core';
import { gamesTable } from './games';
import { users } from '@/app/_db/schema/auth/users';

export const favouritesTable = pgTable('favourites', {
    id: serial('id').primaryKey(),
    gameId: integer('game_id')
        .notNull()
        .references(() => gamesTable.id, { onDelete: "cascade" }),
    userId: text('user_id')
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp('created_at').notNull().defaultNow()
}, (table) => [
    unique('favourites_user_game_unique').on(table.userId, table.gameId),   // one row per user and game; its index also serves lookups by user
    index('favourites_game_id_idx').on(table.gameId)                        // speeds up the cascade when a game is deleted
]);