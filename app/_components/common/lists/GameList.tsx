'use client';

import { ReactElement } from "react";
import { Game } from "@/app/_types/types";
import { GameListEntry } from "./GameListEntry";

import "./GameList.css";

/**
 * This component consists of a game list (in List View) and its heading. It is possible to sort the supplied
 * list of games by clicking on each heading.
 */
export function GameList({ games }: { games: Game[] }): ReactElement {

    return (
        <ul id="gameList">
            <section id="listHeading">
                <section id="game-title">
                    <span className="material-symbols-outlined"> keyboard_arrow_down </span>
                    <h2 className="game-title"> Title </h2>
                </section>
                
                <section id="game-category">
                    <span className="material-symbols-outlined"> keyboard_arrow_down </span>
                    <h2 className="game-category"> Category </h2>
                </section>

                <section id="game-players">
                    <span className="material-symbols-outlined"> keyboard_arrow_down </span>
                    <h2 className="game-players"> Players </h2>
                </section>

                <section id="game-developer">
                    <span className="material-symbols-outlined"> keyboard_arrow_down </span>
                    <h2 className="game-developer"> Developer </h2>
                </section>                
                
                <section id="game-publisher">
                    <span className="material-symbols-outlined"> keyboard_arrow_down </span>
                    <h2 className="game-publisher"> Publisher </h2>
                </section>
            </section>

            {
                games.map(game => <GameListEntry game={game} key={game.id} />)
            }
        </ul>
    );
}