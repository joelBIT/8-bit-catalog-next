'use client';

import { ReactElement } from "react";
import Link from "next/link";
import { Game } from "@/app/_db/schema/games";

import "./PlayButton.css";

/**
 * If game.rom is false, the game is not playable so no button is created. If true, a play button is created.
 */
export function PlayButton({game}: {game: Game}): ReactElement {
    
    if (!game.rom) {
        return ( <></> );
    }

    return (
        <Link className="playButton" href={`https://rollnes.joel-rollny.eu/games/${game?.id}`} target="_blank">
            <span className="material-symbols-outlined">play_circle</span>
            <span className="button-text">Play</span>
        </Link>
    );
}