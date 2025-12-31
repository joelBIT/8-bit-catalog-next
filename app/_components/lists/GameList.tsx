'use client';

import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGame } from "@/app/_hooks";
import { Game } from "@/app/_db/schema/games";
import { GameListEntry } from "./GameListEntry";
import { GameModal } from "../common";

import "./GameList.css";

/**
 * Shows a game list in List View.
 */
export function GameList({ games }: { games: Game[] }): ReactElement {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const showModal = params.get('show') ? true : false;
    const [currentGames, setCurrentGames] = useState<Game[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(showModal);
    const { selectedGame, setSelectedGame } = useGame();

    useEffect(() => {
        setCurrentGames(games);
    })

    useEffect(() => {
        setOpenModal(showModal);
    }, [showModal])

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
            { openModal && Object.keys(selectedGame).length > 0 ? <GameModal games={currentGames} game={selectedGame} close={() => closeGameModal()} /> : <></> }
            
            { currentGames.length > 0 ? currentGames.map(game => <GameListEntry game={game} key={game.id} openModal={openGameModal} />) : <></> }
        </ul>
    );
}