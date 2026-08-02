'use client';

import { ReactElement, useState } from "react";
import Image from 'next/image';
import { usePathname, useRouter } from "next/navigation";
import { useFavourites } from "@/app/_hooks";
import { Game } from "@/app/_db/schema/games";
import { URL_COLLECTION_PAGE, URL_GAME_PAGE } from "@/app/_utils/utils";

import "./GameListEntry.css";

/**
 * An entry in a collection of games. Corresponds to a row in a regular list in List View.
 * When hovering a game cover that cover will appear enlarged in a modal.
 */
export function GameListEntry({ game }: { game: Game }): ReactElement {
    const [removeCard, setRemoveCard] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
    const pathname = usePathname();
    const router = useRouter();
    const { addFavouriteGame, removeFavouriteGame, isFavourite } = useFavourites();
    const favourite = isFavourite(game.id);
    const STORAGE_URL = process.env.NEXT_PUBLIC_COVER;

    /**
     * Adds or removes a game from the list of games.
     */
    function handleFavourites(): void {
        if (favourite) {
            if (pathname === URL_COLLECTION_PAGE) {           // If a game card is removed from collection page, it fades out
                setIsFadingOut(true);
                setTimeout(() => removeFavouriteGame(game), 300);
                setTimeout(() => { setRemoveCard(true) }, 500);
            } else {
                removeFavouriteGame(game);
            }
        } else {
            addFavouriteGame(game);
        }
    }

    return (
        <section className={isFadingOut ? "is-fading" : ""} key={game.id}>
            <li className={removeCard ? "hidden" : "gameListEntry"}>
                <Image 
                    src={STORAGE_URL + game.cover}
                    unoptimized
                    className="gameListEntry-figure__cover"
                    onMouseEnter={() => setShowModal(true)}
                    onMouseLeave={() => setShowModal(false)}
                    onClick={() => router.push(URL_GAME_PAGE + `/${game.id}`)}
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
                    <section className="gameListEntry-title__link" onClick={() => router.push(URL_GAME_PAGE + `/${game.id}`)}> 
                        {game.title} 
                    </section> 

                    <section className="gameListEntry-tags">
                        <h2 className="gameListEntry-tag" title="Category"> {game.category} </h2>
                        <h2 className="gameListEntry-tag"> {game.players} player{game.players > 1 ? "s": ""} </h2>
                        <h2 className="gameListEntry-tag" title="Release Date"> {game.releaseDate?.toString()} </h2>
                    </section>

                    <section className="gameListEntry-details">
                        <section className="details-section">
                            <h2 className="details__heading"> Developer: </h2>
                            <h2 className="details__text"> {game.developer} </h2>
                        </section>

                        <section className="details-section">
                            <h2 className="details__heading details-publisher"> Publisher: </h2>
                            <h2 className="details__text"> {game.publisher} </h2>
                        </section>
                    </section>
                </section>

                <section className="gameListEntry-favourite">
                    <button 
                        className={ favourite ? `favouriteButton isFavourite` : `favouriteButton noFavourite` } 
                        onClick={handleFavourites}
                    >
                    </button>
                </section>
            </li>
        </section>
    );
}