'use client';

import { ReactElement } from "react";
import Link from "next/link";

import "./PlayRomLink.css";

export function PlayRomLink({ id } : { id: number}): ReactElement {
    return (
        <Link 
            id="playRomLink"
            target="_blank"
            href={`https://nes-emulator.vercel.app?id=${id}`} 
        >
            Play
        </Link>
    );
}