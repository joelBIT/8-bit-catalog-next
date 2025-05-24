'use client';

import { ReactElement } from "react";
import { Game } from "@/app/_types/types";
import { GameListEntry } from "./GameListEntry";

import "./GameList.css";

/**
 * This component consists of a game list (in List View) and its heading.
 */
export function GameList({ games }: { games: Game[] }): ReactElement {

    return (
        <ul id="gameList">
            <section id="listHeading">
                <h2 className="game-title"> Title </h2>
                <h2 className="game-category"> Category </h2>
                <h2 className="game-players"> Players </h2>
                <h2 className="game-developer"> Developer </h2>
                <h2 className="game-publisher"> Publisher </h2>
            </section>

            {
                games.map(game => <GameListEntry game={game} key={game.id} />)
            }
        </ul>
    );
}