'use client';

import { ReactElement } from "react";
import Link from "next/link";
import Image from 'next/image';
import { Game } from "@/app/_types/types";

import "./GameDetailsCard.css";

/**
 * Show metadata of the supplied game.
 */
export function GameDetailsCard({ game }: { game: Game }): ReactElement {
    const STORAGE_URL = process.env.NEXT_PUBLIC_COVER;

    const GAME_DETAILS = [
        {text: game?.category, description: "It is often the case that a game falls into several categories.", type: "Category"},
        {text: game?.release_date, description: "There are usually different release dates depending on which continent the game was released.", type: "Released"},
        {text: game?.players, description: "Some multi-player games only allow taking turns, while others enable playing at the same time.", type: "Players"},
        {text: game?.publisher, description: "A game may have several publishers depending on which continent the game was released.", type: "Publisher"},
        {text: game?.developer, description: "Sometimes, multiple developer studios worked together on a game.", type: "Developer"}
    ]

    return (
        <section id="gameDetailsCard">
            <article id="game-cover-tags">
                <section id="cover-wrapper">
                    <Image 
                        src={STORAGE_URL + game?.cover}
                        unoptimized
                        className="gameDetailsCard-image"
                        alt="Game Cover"
                        width={900}
                        height={470}
                    />

                    <Link href={STORAGE_URL + game?.cover} target="_blank" className="button__link">
                        Open cover
                        <span className="material-symbols-outlined"> open_in_new </span>
                    </Link>
                </section>

                <article id="gameDetails">
                    <section id="titleLink">
                        <h1 className="gameDetails__title">
                            {game?.title} 
                        </h1>

                        { 
                            game?.rom ? 
                                <Link className="button__link" target="_blank" href={`https://rollnes.joel-rollny.eu/games/${game?.id}`}>
                                    Play 
                                    <span className="material-symbols-outlined"> open_in_new </span>
                                </Link> 
                            : <></> 
                        }
                    </section>

                    <article id="gameDetailsCard__description">
                        { game?.description }
                    </article>
                </article>
            </article>

            <section className="metadata-cards">
                {
                    GAME_DETAILS.map(detail => 
                        <section className={`metadata-card ${detail.type}`} key={detail.type}>
                            <section id="metadata-information">
                                <h2 className="metadata-type"> {detail.type} </h2>
                                <h2 className="metadata-text"> {detail.text} </h2>
                                <div className="metadata-description">
                                    { detail.description }
                                </div>
                            </section>
                        </section>
                    )
                }
            </section>
        </section>
    )
}