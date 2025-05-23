'use client';

import { ReactElement } from "react";
import { Game } from "@/app/_types/types";
import { GameListEntry } from "./GameListEntry";

import "./GameList.css";

export function GameList({ games }: { games: Game[] }): ReactElement {

    return (
        <ul id="gameList">
            {
                games.map(game => <GameListEntry game={game} key={game.id} />)
            }
        </ul>
    );
}