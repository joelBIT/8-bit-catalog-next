'use client';

import { ReactElement } from "react";
import { Game } from "@/app/_types/types";
import { FavouriteListEntry } from "./FavouriteListEntry";

import "./GameList.css";

export function GameList({ games }: { games: Game[] }): ReactElement {

    return (
        <ul id="gameList">
            {
                games.map(game => <FavouriteListEntry game={game} key={game.id} />)
            }
        </ul>
    );
}