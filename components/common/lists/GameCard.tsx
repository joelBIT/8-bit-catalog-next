'use client';

import { ReactElement, useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import { FavouriteButton } from "@/components/favourites";
import { Game } from "@/types/types";
import { URL_GAME_DETAILS_PAGE } from "@/utils/utils";
import { rancho } from "@/fonts/fonts";

import "./GameCard.css";

/**
 * Represents a card containing information about a game. The card is clickable so that
 * a user can navigate to the game's detail page if interested. It is also possible to
 * add a game card to the list of favourite games. This game card is used in Grid Views.
 * 
 * @param game          a game
 * @returns             a clickable card with game information
 */
export function GameCard({ game }: { game: Game }): ReactElement {
    const [ isFadingOut, setIsFadingOut ] = useState<boolean>(false);
    const [ removeCard, setRemoveCard ] = useState<boolean>(false);
    const STORAGE_URL = process.env.NEXT_PUBLIC_COVER;
    
    return (
        <Link href={`${URL_GAME_DETAILS_PAGE}/${game.id}`} className={isFadingOut ? "is-fading" : ""}>
            <section className={removeCard ? "hidden" : "gameCard"}>
                <figure className="gameCard-figure">
                    <Image 
                        src={STORAGE_URL + game.cover}
                        unoptimized
                        className="gameCard-figure__cover"
                        alt="Game Cover"
                        width={100}
                        height={300}
                    />

                    <section className="gameCard-favourite">
                        <FavouriteButton game={game} setFading={setIsFadingOut} removeCard={setRemoveCard} />
                    </section>

                    <div className="darken-image-bottom" />

                    <article id="gameCardTitle" className={`${rancho.className}`}>
                        {game.title}
                    </article>
                </figure>
            </section>
        </Link>
    );
}