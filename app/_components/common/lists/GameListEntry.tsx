'use client';

import { ReactElement, useState } from "react";
import Image from 'next/image';
import { Game } from "@/app/_types/types";
import { FavouriteButton } from "../../favourites";

import "./GameListEntry.css";

/**
 * An entry in a list of games. Corresponds to a row in a regular list in List View.
 * When hovering a game cover that cover will appear enlarged in a modal.
 */
export function GameListEntry({ game, click }: { game: Game, click: (game: Game) => void }): ReactElement {
    const [ removeCard, setRemoveCard ] = useState<boolean>(false);
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const STORAGE_URL = process.env.NEXT_PUBLIC_COVER;

    return (
        <li key={game.id} className={removeCard ? "hidden" : "gameListEntry"}>
            <Image 
                src={STORAGE_URL + game.cover}
                unoptimized
                className="gameCard-figure__cover"
                onMouseEnter={() => setShowModal(true)}
                onMouseLeave={() => setShowModal(false)}
                onClick={() => click(game)}
                alt="Game Cover"
                width={100}
                height={100}
            />

            <section className={showModal ? "image-modal-show" : "hidden"}>
                <Image 
                    src={STORAGE_URL + game.cover}
                    unoptimized
                    className="gameCard-figure__cover"
                    alt="Game Cover"
                    width={300}
                    height={300}
                />
            </section>

            <h2 className="gameCard-title"> 
                <section className="gameCard-title__link" onClick={() => click(game)}> 
                    {game.title} 
                </section> 
            </h2>
            
            <section className="category-section">
                <h2 className="gameCard-category__heading"> Category </h2>
                <h2 className="gameCard-category"> {game.category} </h2>
            </section>

            <section className="players-section">
                <h2 className="gameCard-players__heading"> Players </h2>
                <h2 className="gameCard-players"> {game.players} </h2>
            </section>

            <section className="developer-section">
                <h2 className="gameCard-developer__heading"> Developer </h2>
                <h2 className="gameCard-developer"> {game.developer} </h2>
            </section>

            <section className="publisher-section">
                <h2 className="gameCard-publisher__heading"> Publisher </h2>
                <h2 className="gameCard-publisher"> {game.publisher} </h2>
            </section>

            <FavouriteButton game={game} setFading={() => {}} removeCard={setRemoveCard} />
        </li>
    );
}