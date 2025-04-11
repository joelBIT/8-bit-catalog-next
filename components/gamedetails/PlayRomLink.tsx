'use client';

import { ReactElement } from "react";
import Link from "next/link";

import "./PlayRomLink.css";

export function PlayRomLink({ id } : { id: number }): ReactElement {
    return (
        <Link 
            id="playRomLink"
            target="_blank"
            href={`https://emulator.joel-rollny.eu?id=${id}`} 
        >
            Play
        </Link>
    );
}