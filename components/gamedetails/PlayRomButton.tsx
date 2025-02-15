'use client';

import { ReactElement } from "react";
import Link from "next/link";

import "./PlayRomButton.css";

export function PlayRomButton({ id } : { id: number}): ReactElement {
    return (
        <Link 
            id="playRomButton" 
            className="gameButton"
            target="_blank"
            href={`https://nes-emulator.vercel.app?id=${id}`} 
        >
            Play
        </Link>
    );
}