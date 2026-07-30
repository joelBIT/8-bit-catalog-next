'use client';

import { ReactElement, useEffect, useState } from "react";
import { Game } from "@/app/_db/schema/games";
import { GameCard } from "../games";

import "./GameGrid.css";

/**
 * This component consists of a game list in Grid View.
 */
export function GameGrid({ games }: { games: Game[] }): ReactElement {
    const [currentGames, setCurrentGames] = useState<Game[]>([]);

    useEffect(() => {
        setCurrentGames(games);
    })

    return (
        <section id="gameGrid"> 
            { 
                currentGames.length > 0 
                    ? 
                        currentGames.map(game => <GameCard game={game} key={game.id} />) 
                    : 
                <></> 
            }
        </section>
    );
}