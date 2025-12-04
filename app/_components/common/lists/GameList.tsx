'use client';

import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGame } from "@/app/_hooks/useGame";
import { Game } from "@/app/_types/types";
import { GameListEntry } from "./GameListEntry";
import { GameModal } from "..";

import "./GameList.css";

/**
 * This component consists of a game list (in List View) and its heading. It is possible to sort the supplied
 * list of games by clicking on each heading.
 */
export function GameList({ games, page }: { games: Game[], page: number }): ReactElement {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const showModal = !!params.get('show');
    const [ active, setActive ] = useState<string>('');
    const [ ascending, setAscending ] = useState<boolean>(false);
    const [ currentGames, setCurrentGames ] = useState<Game[]>([]);
    const [ currentPage, setCurrentPage ] = useState<number>(-1);
    const [ openModal, setOpenModal ] = useState<boolean>(showModal);
    const { selectedGame, setSelectedGame } = useGame();
    const GAME_TITLE = "game-title";
    const GAME_CATEGORY = "game-category";
    const GAME_PLAYERS = "game-players";
    const GAME_DEVELOPER = "game-developer";
    const GAME_PUBLISHER = "game-publisher";
    const HEADING_CLASSES = [GAME_TITLE, GAME_CATEGORY, GAME_PLAYERS, GAME_DEVELOPER, GAME_PUBLISHER];
    const HEADINGS = ["Title", "Category", "Players", "Developer", "Publisher"];

    useEffect(() => {
        if (active) {                           // The selected sorting is executed on each render
            sortAscending(active, ascending);
            setCurrentGames(games);
        }

        if (page !== currentPage) {         // New page containing new games so list of games and current page are updated
            setCurrentGames(games);
            setCurrentPage(page);
        }

        if (!active && page === currentPage) {      // Set games when user e.g., refreshes the browser (resets sorting)
            setCurrentGames(games);
        }

        setOpenModal(showModal);        // Close modal if navigating back from modal to page
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
                if (ascending) {
                    games.sort((a, b) => a.title.localeCompare(b.title));
                } else {
                    games.sort((a, b) => b.title.localeCompare(a.title))
                }
                break;
            case GAME_CATEGORY:
                if (ascending) {
                    games.sort((a, b) => a.category.localeCompare(b.category));
                } else {
                    games.sort((a, b) => b.category.localeCompare(a.category));
                }
                break;
            case GAME_PLAYERS:
                if (ascending) {
                    games.sort((a, b) => a.players - b.players);
                } else {
                    games.sort((a, b) => b.players - a.players);
                }
                break;
            case GAME_DEVELOPER:
                if (ascending) {
                    games.sort((a, b) => a.developer.localeCompare(b.developer));
                } else {
                    games.sort((a, b) => b.developer.localeCompare(a.developer));
                }
                break;
            case GAME_PUBLISHER:
                if (ascending) {
                    games.sort((a, b) => a.publisher.localeCompare(b.publisher));
                } else {
                    games.sort((a, b) => b.publisher.localeCompare(a.publisher));
                }
                break;
        }
    }

    function openGameModal(game: Game): void {
        closeGameModal();       // Handles when back button on mobile phone is used, makes sure the url is really updated before opening modal

        setTimeout(() => {
            params.set('show', "true");
            window.history.pushState(null, '', `?${params.toString()}`);
            setSelectedGame(game);
            setOpenModal(true);
        }, 300);
    }

    function closeGameModal(): void {
        params.delete('show');
        window.history.pushState(null, '', `?${params.toString()}`);
        setSelectedGame({} as Game);
        setOpenModal(false);
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

            { openModal && Object.keys(selectedGame).length > 0 ? <GameModal games={currentGames} game={selectedGame} close={() => closeGameModal()} /> : <></> }
            
            { currentGames.length > 0 ? currentGames.map(game => <GameListEntry game={game} key={game.id} click={openGameModal} />) : <></> }
        </ul>
    );
}