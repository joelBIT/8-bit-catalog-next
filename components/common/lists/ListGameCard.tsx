'use client';

import { ReactElement, useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import { URL_GAME_DETAILS_PAGE } from "@/utils/utils";
import { Game } from "@/types/types";
import { singleDay } from "@/fonts/fonts";
import { FavouriteButton } from "@/components/favourites";

import "./ListGameCard.css";

/**
 * Represents a card containing information about a game. The card is clickable so that
 * a user can navigate to the game's detail page if interested. It is also possible to
 * add a game card to the list of favourite games. This game card is used in List Views.
 * 
 * @param game          a game
 * @returns             a clickable card with game information
 */
export function ListGameCard({ game }: { game: Game }): ReactElement {
        const [ isFadingOut, setIsFadingOut ] = useState<boolean>(false);
        const [ removeCard, setRemoveCard ] = useState<boolean>(false);
        const STORAGE_URL = process.env.NEXT_PUBLIC_COVER;
        
    return (
        <section className="listGameCard">
            <Link href={`${URL_GAME_DETAILS_PAGE}/${game.id}`} className={isFadingOut ? "is-fading" : ""}>
            <section className={removeCard ? "hidden" : "showCard"}>
                <figure className="gameCard-figure">
                    <Image 
                        src={STORAGE_URL + game.cover}
                        unoptimized
                        className="gameCard-figure__cover"
                        alt="Game Cover"
                        width={100}
                        height={300}
                    />

                    <article id="gameCardTitle">
                        <FavouriteButton game={game} setFading={setIsFadingOut} removeCard={setRemoveCard} />
                        <h1 className={`gameCardTitle__heading ${singleDay.className}`}> {game.title} </h1>
                    </article>
                </figure>
            </section>
        </Link>

        </section>
    )
}