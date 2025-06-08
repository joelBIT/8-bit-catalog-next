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
    const STORAGE_URL = process.env.NEXT_PUBLIC_COVER;

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    function nextSlide(): void {
        setSlide(slide === games.length - 1 ? 0 : slide + 1);
    }

    function prevSlide(): void {
        setSlide(slide === 0 ? games.length - 1 : slide - 1);
    }

    return (
        <dialog id="gameModal" ref={dialogRef}>
            <section className="container">
                <section className="carousel">
                    <img
                        className="item"
                        src={STORAGE_URL + suppliedGames[slide === 0 ? games.length - 2 : (slide === 1 ? games.length - 1 : slide - 2)]?.cover}
                        alt="Game 2 clicks back"
                    />

                    <img
                        className="item"
                        src={STORAGE_URL + suppliedGames[slide === 0 ? games.length - 1 : slide - 1]?.cover}
                        alt="Previous game"
                    />

                    <img
                        className="item"
                        src={STORAGE_URL + suppliedGames[slide]?.cover}
                        alt="Current game"
                    />

                    <img
                        className="item"
                        src={STORAGE_URL + suppliedGames[slide === games.length - 1 ? 0 : slide + 1]?.cover}
                        alt="Next game"
                    />

                    <img
                        className="item"
                        src={STORAGE_URL + suppliedGames[slide === games.length - 1 ? 1 : (slide === games.length - 2 ? 0 : slide + 2)]?.cover}
                        alt="Game 2 clicks forward"
                    />
                </section>
            </section>

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