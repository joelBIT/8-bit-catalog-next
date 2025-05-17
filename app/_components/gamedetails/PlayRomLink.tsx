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
            <section className="playRom-content">
                <span className="material-symbols-outlined"> play_circle </span>
                <h2 className="playRom-text"> Play </h2>
            </section>
        </Link>
    );
}