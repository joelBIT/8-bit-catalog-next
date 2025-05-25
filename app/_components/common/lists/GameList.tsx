'use client';

import { ReactElement, useEffect, useState } from "react";
import { Game } from "@/app/_types/types";
import { GameListEntry } from "./GameListEntry";

import "./GameList.css";

/**
 * This component consists of a game list (in List View) and its heading. It is possible to sort the supplied
 * list of games by clicking on each heading.
 */
export function GameList({ games }: { games: Game[] }): ReactElement {
    const [ active, setActive ] = useState<string>('');
    const [ ascending, setAscending ] = useState<boolean>(false);
    const [ sortedGames, setSortedGames ] = useState<Game[]>([]);
    const GAME_TITLE = "game-title";
    const GAME_CATEGORY = "game-category";
    const GAME_PLAYERS = "game-players";
    const GAME_DEVELOPER = "game-developer";
    const GAME_PUBLISHER = "game-publisher";
    const HEADING_CLASSES = [GAME_TITLE, GAME_CATEGORY, GAME_PLAYERS, GAME_DEVELOPER, GAME_PUBLISHER];
    const HEADINGS = ["Title", "Category", "Players", "Developer", "Publisher"];

    useEffect(() => {
        if (active) {                               // When navigating between pages the selected sorting is executed on each page render
            sortAscending(active, ascending);
        }
        setSortedGames(games);
    })

    /**
     * The games are sorted differently depending on if a heading is clicked multiple times in a row or clicked for the first time.
     */
    function sortGames(property: string): void {
        if (active === property) {
            sortAscending(property, !ascending);
            setAscending(!ascending);       // Toggle arrow if user clicks on the same heading multiple times
        } else {
            sortAscending(property, true);
            setAscending(true);             // A heading is ascending when clicked the first time
            setActive(property);
        }
    }

    /**
     * Sort the games by the chosen metadata property in an ascending or descending order.
     */
    function sortAscending(property: string, ascending: boolean): void {
        switch(property) {
            case GAME_TITLE:
                ascending ? games.sort((a, b) => a.title.localeCompare(b.title)) : games.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case GAME_CATEGORY:
                ascending ? games.sort((a, b) => a.category.localeCompare(b.category)) : games.sort((a, b) => b.category.localeCompare(a.category));
                break;
            case GAME_PLAYERS:
                ascending ? games.sort((a, b) => a.players - b.players) : games.sort((a, b) => b.players - a.players);
                break;
            case GAME_DEVELOPER:
                ascending ? games.sort((a, b) => a.developer.localeCompare(b.developer)) : games.sort((a, b) => b.developer.localeCompare(a.developer));
                break;
            case GAME_PUBLISHER:
                ascending ? games.sort((a, b) => a.publisher.localeCompare(b.publisher)) : games.sort((a, b) => b.publisher.localeCompare(a.publisher));
                break;
        }
    }

    return (
        <ul id="gameList">
            <section id="listHeading">
                {
                    HEADING_CLASSES.map((heading, index) => 
                        <section id={heading} className={active === heading ? "active" : ""} key={heading}>
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
                sortedGames.length > 0 ? sortedGames.map(game => <GameListEntry game={game} key={game.id} />) : <></>
            }
        </ul>
    );
}