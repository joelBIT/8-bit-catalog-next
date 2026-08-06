'use client';

import { ReactElement, useEffect, useState } from "react";
import { Game } from "@/app/_db/schema/games";
import { GameListEntry } from "./GameListEntry";

import "./GameList.css";

/**
 * Shows a game list in List View.
 */
export function GameList({ games }: { games: Game[] }): ReactElement {
    const [currentGames, setCurrentGames] = useState<Game[]>([]);

    useEffect(() => {
        setCurrentGames(games);
    }, [games])

    let content = <></>;

    if (currentGames.length > 0) {
        content = <>
            { currentGames.map(game => <GameListEntry game={game} key={game.id} />) }
        </>
    }

    return (
        <ul id="gameList">
            {content}
        </ul>
    );
}