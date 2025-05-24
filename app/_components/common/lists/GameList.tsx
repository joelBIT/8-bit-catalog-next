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
    const [ ascending, setAscending ] = useState<boolean>(true);
    const GAME_TITLE = "game-title";
    const GAME_CATEGORY = "game-category";
    const GAME_PLAYERS = "game-players";
    const GAME_DEVELOPER = "game-developer";
    const GAME_PUBLISHER = "game-publisher";
    const HEADING_CLASSES = [GAME_TITLE, GAME_CATEGORY, GAME_PLAYERS, GAME_DEVELOPER, GAME_PUBLISHER];
    const HEADINGS = ["Title", "Category", "Players", "Developer", "Publisher"];

    function sortGames(property: string) {
        switch(property) {
            case GAME_TITLE:
                active === property ? games.sort((a, b) => b.title.localeCompare(a.title)) : games.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case GAME_CATEGORY:
                active === property ? games.sort((a, b) => b.category.localeCompare(a.category)) : games.sort((a, b) => a.category.localeCompare(b.category));
                break;
            case GAME_PLAYERS:
                active === property ? games.sort((a, b) => b.players - a.players) : games.sort((a, b) => a.players - b.players);
                break;
            case GAME_DEVELOPER:
                games.sort((a, b) => a.developer.localeCompare(b.developer));
                break;
            case GAME_PUBLISHER:
                games.sort((a, b) => a.publisher.localeCompare(b.publisher));
                break;
        }

        if (active === property) {
            setAscending(!ascending);       // Toggle arrow if user clicks on the same heading multiple times
        } else {
            setAscending(true);             // A heading is ascending when clicked the first time
        }

        setActive(property);
    }

    return (
        <ul id="gameList">
            <section id="listHeading">
                {
                    HEADING_CLASSES.map((heading, index) => 
                        <section id={heading} className={active === heading ? "active" : ""}>
                            <span 
                                className={ascending ? "material-symbols-outlined ascending" : "material-symbols-outlined"} 
                                onClick={() => sortGames(heading)}
                            > 
                                keyboard_arrow_down 
                            </span>
                            <h2 className={heading} onClick={() => sortGames(heading)}> {HEADINGS[index]} </h2>
                        </section>
                    )
                }
            </section>
            
            {
                games.map(game => <GameListEntry game={game} key={game.id} />)
            }
        </ul>
    );
}