'use client';

import { ReactElement, useState } from "react";
import { Game } from "@/app/_types/types";
import { GameListEntry } from "./GameListEntry";

import "./GameList.css";

/**
 * This component consists of a game list (in List View) and its heading. It is possible to sort the supplied
 * list of games by clicking on each heading.
 */
export function GameList({ games }: { games: Game[] }): ReactElement {
    const [ active, setActive ] = useState<string>('');
    const GAME_TITLE = "game-title";
    const GAME_CATEGORY = "game-category";
    const GAME_PLAYERS = "game-players";
    const GAME_DEVELOPER = "game-developer";
    const GAME_PUBLISHER = "game-publisher";

    return (
        <ul id="gameList">
            <section id="listHeading">
                <section id={GAME_TITLE} className={active === GAME_TITLE ? "active" : ""}>
                    <span className="material-symbols-outlined" onClick={() => setActive(GAME_TITLE)}> keyboard_arrow_down </span>
                    <h2 className={GAME_TITLE} onClick={() => setActive(GAME_TITLE)}> Title </h2>
                </section>
                
                <section id={GAME_CATEGORY} className={active === GAME_CATEGORY ? "active" : ""}>
                    <span className="material-symbols-outlined" onClick={() => setActive(GAME_CATEGORY)}> keyboard_arrow_down </span>
                    <h2 className={GAME_CATEGORY} onClick={() => setActive(GAME_CATEGORY)}> Category </h2>
                </section>

                <section id={GAME_PLAYERS} className={active === GAME_PLAYERS ? "active" : ""}>
                    <span className="material-symbols-outlined" onClick={() => setActive(GAME_PLAYERS)}> keyboard_arrow_down </span>
                    <h2 className={GAME_PLAYERS} onClick={() => setActive(GAME_PLAYERS)}> Players </h2>
                </section>

                <section id={GAME_DEVELOPER} className={active === GAME_DEVELOPER ? "active" : ""}>
                    <span className="material-symbols-outlined" onClick={() => setActive(GAME_DEVELOPER)}> keyboard_arrow_down </span>
                    <h2 className={GAME_DEVELOPER} onClick={() => setActive(GAME_DEVELOPER)}> Developer </h2>
                </section>                
                
                <section id={GAME_PUBLISHER} className={active === GAME_PUBLISHER ? "active" : ""}>
                    <span className="material-symbols-outlined" onClick={() => setActive(GAME_PUBLISHER)}> keyboard_arrow_down </span>
                    <h2 className={GAME_PUBLISHER} onClick={() => setActive(GAME_PUBLISHER)}> Publisher </h2>
                </section>
            </section>

            {
                games.map(game => <GameListEntry game={game} key={game.id} />)
            }
        </ul>
    );
}