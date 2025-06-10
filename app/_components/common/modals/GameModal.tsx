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

    function twiceNextSlide(): void {
        setSlide(slide === games.length - 1 ? 1 : (slide === games.length - 2 ? 0 : slide + 2));
    }

    function prevSlide(): void {
        setSlide(slide === 0 ? games.length - 1 : slide - 1);
    }

    function twicePrevSlide(): void {
        setSlide(slide === 0 ? games.length - 2 : (slide === 1 ? games.length - 1 : slide - 2));
    }

    return (
        <dialog id="gameModal" ref={dialogRef}>
            <section className="container">
                <section className="carousel">
                    <img
                        className={suppliedGames.length < 5 ? "hidden" : "item first-game"}
                        src={STORAGE_URL + suppliedGames[slide === 0 ? games.length - 2 : (slide === 1 ? games.length - 1 : slide - 2)]?.cover}
                        onClick={twicePrevSlide}
                        alt="Game 2 clicks back"
                    />

                    <img
                        className={suppliedGames.length < 2 ? "hidden" : `item previous-game cards-${suppliedGames.length}`}
                        src={STORAGE_URL + suppliedGames[slide === 0 ? games.length - 1 : slide - 1]?.cover}
                        onClick={prevSlide}
                        alt="Previous game"
                    />

                    <img
                        className={`item selected-game cards-${suppliedGames.length}`}
                        src={STORAGE_URL + suppliedGames[slide]?.cover}
                        alt="Current game"
                    />

                    <img
                        className={suppliedGames.length < 3 ? "hidden" : `item next-game cards-${suppliedGames.length}`}
                        src={STORAGE_URL + suppliedGames[slide === games.length - 1 ? 0 : slide + 1]?.cover}
                        onClick={nextSlide}
                        alt="Next game"
                    />

                    <img
                        className={suppliedGames.length < 4 ? "hidden" : `item last-game cards-${suppliedGames.length}`}
                        src={STORAGE_URL + suppliedGames[slide === games.length - 1 ? 1 : (slide === games.length - 2 ? 0 : slide + 2)]?.cover}
                        onClick={twiceNextSlide}
                        alt="Game 2 clicks forward"
                    />
                </section>

                <section id="carousel-buttons" className={suppliedGames.length < 2 ? "hidden" : ""}>
                    <button id="prevButton" onClick={prevSlide}>
                        <span className={suppliedGames.length < 2 ? "hidden" : "arrow"}> </span>
                    </button>

                    <button id="nextButton" onClick={nextSlide}>
                        <span className={suppliedGames.length < 2 ? "hidden" : "arrow"}> </span>
                    </button>
                </section>
            </section>

            <section id="slide-space" className={"slide"} key={game.id}>
                <div className="darken-image-top" />
                <img id="slide-background" src="/playing.webp" alt="Playing nintendo" />
                <div className="darken-image-bottom" />
                <GameDetailsCard game={suppliedGames[slide > -1 ? slide : 0]} />
            </section>

            <span onClick={close} className="closeButton" />
        </dialog>
    );
}