'use client';

import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGame } from "@/app/_hooks";
import { Game } from "@/app/_types/types";
import { GameCard, GameModal } from "..";

import "./GameGrid.css";

/**
 * This component consists of a game list in Grid View.
 */
export function GameGrid({ games, page }: { games: Game[], page: number }): ReactElement {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const showModal = params.get('show') ? true : false;
    const [ currentGames, setCurrentGames ] = useState<Game[]>([]);
    const [ currentPage, setCurrentPage ] = useState<number>(-1);
    const [ openModal, setOpenModal ] = useState<boolean>(showModal);
    const { selectedGame, setSelectedGame } = useGame();

    console.log("gamedrid")

    useEffect(() => {
        if (page !== currentPage) {         // New page containing new games so list of games and current page are updated
            setCurrentGames(games);
            setCurrentPage(page);
        }

        if (page === currentPage) {
            setCurrentGames(games);
        }

        setOpenModal(showModal);        // Close modal if navigating back from modal to page
    })

    function openGameModal(game: Game): void {
        closeGameModal();       // Handles when back button on mobile phone is used, makes sure the url is really updated before opening modal

        setTimeout(() => {
            params.set('show', "true");
            window.history.pushState(null, '', `?${params.toString()}`);
            setSelectedGame(game);
            setOpenModal(true);
        }, 200);
    }

    function closeGameModal(): void {
        params.delete('show');
        window.history.pushState(null, '', `?${params.toString()}`);
        setSelectedGame({} as Game);
        setOpenModal(false);
    }

    return (
        <section id="gameGrid">
            { openModal && Object.keys(selectedGame).length > 0 ? <GameModal games={currentGames} game={selectedGame} close={() => closeGameModal()} /> : <></> }
            
            { currentGames.length > 0 ? currentGames.map(game => <GameCard game={game} key={game.id} click={openGameModal} />) : <></> }
        </section>
    );
}