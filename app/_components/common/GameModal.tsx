'use client';

import { ReactElement, useEffect, useRef, useState } from 'react';
import { GameDetailsCard } from '@/app/_components/gamedetails';
import { Game } from '@/app/_db/schema/games';

import "./GameModal.css";

/**
 * Modal showing metadata about the supplied game. It is possible to navigate between the supplied games by clicking on respective cover image.
 */
export function GameModal({ games, game, close }: { games: Game[], game: Game, close: () => void }): ReactElement {
    const [slide, setSlide] = useState<number>(games.findIndex(element => element.id === game.id));
    const [suppliedGames] = useState<Game[]>(games);
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
            <section className="carousel-container">
                <section className={suppliedGames.length === 1 ? "hidden" : "carousel"}>
                    <img
                        className={suppliedGames.length < 5 ? "hidden" : "item first-game"}
                        src={STORAGE_URL + suppliedGames[slide === 0 ? games.length - 2 : (slide === 1 ? games.length - 1 : slide - 2)]?.cover}
                        onClick={twicePrevSlide}
                        title={suppliedGames[slide === 0 ? games.length - 2 : (slide === 1 ? games.length - 1 : slide - 2)]?.title}
                        alt="Game 2 clicks back"
                    />

                    <img
                        className={suppliedGames.length < 2 ? "hidden" : `item previous-game cards-${suppliedGames.length}`}
                        src={STORAGE_URL + suppliedGames[slide === 0 ? games.length - 1 : slide - 1]?.cover}
                        onClick={prevSlide}
                        title={suppliedGames[slide === 0 ? games.length - 1 : slide - 1]?.title}
                        alt="Previous game"
                    />

                    <img
                        className={suppliedGames.length === 1 ? "hidden" : `item selected-game cards-${suppliedGames.length}`}
                        src={STORAGE_URL + suppliedGames[slide]?.cover}
                        title={suppliedGames[slide]?.title}
                        alt="Current game"
                    />

                    <img
                        className={suppliedGames.length < 3 ? "hidden" : `item next-game cards-${suppliedGames.length}`}
                        src={STORAGE_URL + suppliedGames[slide === games.length - 1 ? 0 : slide + 1]?.cover}
                        onClick={nextSlide}
                        title={suppliedGames[slide === games.length - 1 ? 0 : slide + 1]?.title}
                        alt="Next game"
                    />

                    <img
                        className={suppliedGames.length < 4 ? "hidden" : `item last-game cards-${suppliedGames.length}`}
                        src={STORAGE_URL + suppliedGames[slide === games.length - 1 ? 1 : (slide === games.length - 2 ? 0 : slide + 2)]?.cover}
                        onClick={twiceNextSlide}
                        title={suppliedGames[slide === games.length - 1 ? 1 : (slide === games.length - 2 ? 0 : slide + 2)]?.title}
                        alt="Game 2 clicks forward"
                    />
                </section>
            </section>

            <section id="slide-space" className={"slide"} key={game.id}>
                <div className="darken-image-top" />
                <img id="slide-background" src="/game/playing.webp" alt="Playing nintendo" />
                <div className="darken-image-bottom" />
                <GameDetailsCard game={suppliedGames[slide > -1 ? slide : 0]} />
            </section>

            <span onClick={close} className="closeButton" />
        </dialog>
    );
}