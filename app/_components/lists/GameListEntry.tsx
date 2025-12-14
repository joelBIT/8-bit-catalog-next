'use client';

import { ReactElement, useState } from "react";
import Image from 'next/image';
import { Game } from "@/app/_types/types";
import { FavouriteButton } from "../favourites";

import "./GameListEntry.css";

/**
 * An entry in a list of games. Corresponds to a row in a regular list in List View.
 * When hovering a game cover that cover will appear enlarged in a modal.
 */
export function GameListEntry({ game, openModal }: { game: Game, openModal: (game: Game) => void }): ReactElement {
    const [removeCard, setRemoveCard] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const STORAGE_URL = process.env.NEXT_PUBLIC_COVER;

    return (
        <li key={game.id} className={removeCard ? "hidden" : "gameListEntry"}>
            <Image 
                src={STORAGE_URL + game.cover}
                unoptimized
                className="gameListEntry-figure__cover"
                onMouseEnter={() => setShowModal(true)}
                onMouseLeave={() => setShowModal(false)}
                onClick={() => openModal(game)}
                alt="Game Cover"
                width={100}
                height={100}
            />

            <section className={showModal ? "image-modal-show" : "hidden"}>
                <Image 
                    src={STORAGE_URL + game.cover}
                    unoptimized
                    className="gameListEntry-figure__cover"
                    alt="Game Cover"
                    width={300}
                    height={300}
                />
            </section>

            <section className="gameListEntry-information">
                <section className="gameListEntry-title__link" onClick={() => openModal(game)}> 
                    {game.title} 
                </section> 

                <section className="gameListEntry-tags">
                    <h2 className="gameListEntry-tag" title="Category"> {game.category} </h2>
                    <h2 className="gameListEntry-tag"> {game.players} player{game.players > 1 ? "s": ""} </h2>
                </section>

                <section className="gameListEntry-details">
                     <section className="details-section">
                        <h2 className="details__heading"> Developer: </h2>
                        <h2 className="details__text"> {game.developer} </h2>
                    </section>

                    <section className="details-section">
                        <h2 className="details__heading"> Publisher: </h2>
                        <h2 className="details__text"> {game.publisher} </h2>
                    </section>
                </section>
            </section>

            <section className="gameListEntry-favourite">
                <FavouriteButton game={game} setFading={() => {}} removeCard={setRemoveCard} />
            </section>
        </li>
    );
}