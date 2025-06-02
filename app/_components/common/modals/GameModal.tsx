'use client';

import { ReactElement, useEffect, useRef, useState } from 'react';
import { GameDetailsCard } from '../../gamedetails/GameDetailsCard';
import { Game } from '@/app/_types/types';

import "./GameModal.css";

/**
 * Modal showing metadata about the supplied game. It is possible to navigate between the supplied games by using the 'previous' and
 * 'next' buttons.
 */
export function GameModal({ games, game, close }: { games: Game[], game: Game, close: () => void }): ReactElement {
    const [ slide, setSlide ] = useState<number>(games.findIndex(element => element.id === game.id));
    const [ suppliedGames ] = useState<Game[]>(games);
    const dialogRef = useRef<HTMLDialogElement>(null);
    
    function nextSlide(): void {
        setSlide(slide === games.length - 1 ? 0 : slide + 1);
    }

    function prevSlide(): void {
        setSlide(slide === 0 ? games.length - 1 : slide - 1);
    }

    useEffect(() => {
      if (!dialogRef.current?.open) {
        dialogRef.current?.showModal();
      }
    }, []);

    return (
        <dialog id="gameModal" ref={dialogRef}>
            <button id="prevButton" onClick={prevSlide}>
                <span className="material-symbols-outlined arrow"> chevron_left </span>
            </button>

            <section id="slide-space" className={"slide"} key={game.id}>
                <GameDetailsCard game={suppliedGames[slide > -1 ? slide : 0]} />
                <button onClick={close} className="gameButton"> Close </button>
            </section>

            <button id="nextButton" onClick={nextSlide}>
                <span className="material-symbols-outlined arrow"> chevron_right </span>
            </button>
        </dialog>
    );
}