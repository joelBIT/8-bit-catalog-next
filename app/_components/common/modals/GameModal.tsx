'use client';

import { ReactElement, useEffect, useRef } from 'react';
import { GameDetailsCard } from '../../gamedetails/GameDetailsCard';
import { Game } from '@/app/_types/types';

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
            <GameDetailsCard game={game} />
            <button onClick={close} className="gameButton"> Close </button>
        </dialog>
    );
}