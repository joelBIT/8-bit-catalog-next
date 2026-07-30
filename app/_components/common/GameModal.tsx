'use client';

import { ReactElement, useEffect, useRef } from 'react';
import { GameDetailsCard } from '@/app/_components/games';
import { Game } from '@/app/_db/schema/games';

import "./GameModal.css";

/**
 * Modal showing metadata about the supplied game.
 */
export function GameModal({ game, close }: { game: Game, close: () => void }): ReactElement {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    return (
        <dialog id="gameModal" ref={dialogRef}>
            <section id="slide-space" className={"slide"} key={game.id}>
                <div className="darken-image-top" />
                <img id="slide-background" src="/game/playing.webp" alt="Playing nintendo" />
                <div className="darken-image-bottom" />
                <GameDetailsCard game={game} />
            </section>

            <span onClick={close} className="closeButton" />
        </dialog>
    );
}