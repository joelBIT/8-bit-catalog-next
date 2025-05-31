'use client';

import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
    const [ chosenGame, setChosenGame ] = useState<Game>({} as Game);
    const [ openModal, setOpenModal ] = useState<boolean>(showModal);

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
        params.delete('show');
        window.history.pushState(null, '', `?${params.toString()}`);
        setOpenModal(false);

        setTimeout(() => {
            params.set('show', "true");
            window.history.pushState(null, '', `?${params.toString()}`);
            setChosenGame(game);
            setOpenModal(true);
        }, 200);
    }

    function closeGameModal(): void {
        params.delete('show');
        window.history.pushState(null, '', `?${params.toString()}`);
        setOpenModal(false);
    }

    return (
        <section id="gameGrid">
            { openModal ? <GameModal game={chosenGame} close={() => closeGameModal()} /> : <></>}
            
            { currentGames.length > 0 ? currentGames.map(game => <GameCard game={game} key={game.id} click={openGameModal} />) : <></> }
        </section>
    );
}