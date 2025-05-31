'use client';

import { ReactElement, useEffect, useState } from "react";
import { Game } from "@/app/_types/types";
import { GameCard, GameModal } from "..";

import "./GameGrid.css";

/**
 * This component consists of a game list in Grid View.
 */
export function GameGrid({ games, page }: { games: Game[], page: number }): ReactElement {
    const [ currentGames, setCurrentGames ] = useState<Game[]>([]);
    const [ currentPage, setCurrentPage ] = useState<number>(-1);
    const [ chosenGame, setChosenGame ] = useState<Game>({} as Game);
    const [ openModal, setOpenModal ] = useState<boolean>(false);

    useEffect(() => {
        if (page !== currentPage) {         // New page containing new games so list of games and current page are updated
            setCurrentGames(games);
            setCurrentPage(page);
        }

        if (page === currentPage) {
            setCurrentGames(games);
        }
    })

    function openGameModal(game: Game): void {
        setChosenGame(game);
        setOpenModal(true);
    }

    function closeGameModal(): void {
        setOpenModal(false);
    }

    return (
        <section id="gameGrid">
            { openModal ? <GameModal game={chosenGame} close={() => closeGameModal()} /> : <></>}
            
            { currentGames.length > 0 ? currentGames.map(game => <GameCard game={game} key={game.id} click={openGameModal} />) : <></> }
        </section>
    );
}