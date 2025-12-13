'use client';

import { ReactElement, useState } from "react";
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { useFavourites, useGame } from "@/app/_hooks";
import { Game } from "@/app/_types/types";
import { URL_FAVOURITES_PAGE } from "@/app/_utils/utils";

import "./GameCard.css";

/**
 * Represents a card containing information about a game. The card is clickable so that
 * a user can navigate to the game's detail page if interested. This game card is used in Grid Views.
 */
export function GameCard({ game, openModal }: { game: Game, openModal: (game: Game) => void }): ReactElement {
    const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
    const [removeCard, setRemoveCard] = useState<boolean>(false);
    const { setSelectedGame } = useGame();
    const { addFavouriteGame, removeFavouriteGame, isFavourite } = useFavourites();
    const favourite = isFavourite(game.id);
    const pathname = usePathname();
    const STORAGE_URL = process.env.NEXT_PUBLIC_COVER;

    function showGame(): void {
        setSelectedGame(game);
        openModal(game);
    }

    /**
     * Adds or removes a game from the list of favourites. The event is prevented so
     * that a user is not redirected to the game details page when clicking on the favourite button.
     */
    function handleFavourites(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        event.stopPropagation();

        if (favourite) {
            if (pathname === URL_FAVOURITES_PAGE) {           // If a game card is removed from favourites page, it fades out
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
        <section className={isFadingOut ? "is-fading" : ""} onClick={showGame}>
            <section className={removeCard ? "hidden" : "gameCard"}>
                <figure className="gameCard-figure">
                    {
                        favourite ? 
                            <section className="game-favourite">
                                <img src="/isFavourite.png" /> 
                                <h3 className="game-favourite__text"> A favourite </h3> 
                            </section> 
                        : <></>
                    }

                    <Image 
                        src={STORAGE_URL + game.cover}
                        unoptimized
                        className="gameCard-figure__cover"
                        alt="Game Cover"
                        width={100}
                        height={300}
                    />

                    <section className="game-title-area">
                        <h2 className="game-title"> {game.title} </h2>
                    </section>
                </figure>

                <section className="gameCard-favourite" onClick={handleFavourites}>
                    {
                        favourite ? <h3 className="game-is-favourite"> Remove favourite </h3> : <h3> Add as favourite </h3>
                    }
                </section>
            </section>
        </section>
    );
}