'use client';

import { ReactElement, useState } from "react";
import Image from 'next/image';
import { usePathname, useRouter } from "next/navigation";
import { useFavourites, useGame } from "@/app/_hooks";
import { Game } from "@/app/_db/schema/games";
import { URL_COLLECTION_PAGE, URL_GAME_PAGE } from "@/app/_utils/utils";

import "./GameCard.css";


/**
 * Represents a card containing information about a game. The card is clickable so that
 * a user can navigate to the game's detail page if interested. This game card is used in Grid Views.
 */
export function GameCard({ game }: { game: Game }): ReactElement {
    const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
    const [removeCard, setRemoveCard] = useState<boolean>(false);
    const [isShowingTitle, setIsShowingTitle] = useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();
    const { setSelectedGame } = useGame();
    const { addFavouriteGame, removeFavouriteGame, isFavourite } = useFavourites();
    const favourite = isFavourite(game.id);
    const STORAGE_URL = process.env.NEXT_PUBLIC_COVER;

    function showGame(): void {
        setSelectedGame(game);
        router.push(URL_GAME_PAGE + `/${game.id}`);
    }
    
    /**
     * Adds or removes a game from the list of games. The event is prevented so
     * that a user is not redirected to the game details page when clicking on the favourite button.
     */
    function handleFavourites(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        event.stopPropagation();

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
        <section className={isFadingOut ? "is-fading" : ""} onClick={showGame}>
            <section className={removeCard ? "hidden" : "gameCard"}>
                <figure className="gameCard-figure" onMouseEnter={() => setIsShowingTitle(true)} onMouseLeave={() => setIsShowingTitle(false)}>
                    {
                        favourite ? 
                            <section className="game-favourite">
                                <img src="/isFavourite.png" /> 
                                <h3 className="game-favourite__text"> In collection </h3> 
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

                    <section className={isShowingTitle ? "game-title-area dropdown" : "game-title-area"}>
                        <h2 className="game-title"> {game.title} </h2>
                    </section>
                </figure>

                <button className="gameCard-favourite" onClick={handleFavourites}>
                    {
                        favourite ? <h3 className="game-is-favourite"> Remove from collection </h3> : <h3> Add to collection </h3>
                    }
                </button>
            </section>
        </section>
    );
}