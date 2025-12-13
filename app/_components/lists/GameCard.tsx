'use client';

import { ReactElement, useState } from "react";
import Image from 'next/image';
import { useGame } from "@/app/_hooks";
import { FavouriteButton } from "@/app/_components/favourites";
import { Game } from "@/app/_types/types";

import "./GameCard.css";

/**
 * Represents a card containing information about a game. The card is clickable so that
 * a user can navigate to the game's detail page if interested. This game card is used in Grid Views.
 */
export function GameCard({ game, click }: { game: Game, click: (game: Game) => void }): ReactElement {
    const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
    const [removeCard, setRemoveCard] = useState<boolean>(false);
    const { setSelectedGame } = useGame();
    const STORAGE_URL = process.env.NEXT_PUBLIC_COVER;

    function showGame(): void {
        setSelectedGame(game);
        click(game);
    }
    
    return (
        <section className={isFadingOut ? "is-fading" : ""} onClick={showGame}>
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

                    <article id="gameCardTitle">
                        {game.title}
                    </article>
                </figure>
            </section>
        </section>
    );
}