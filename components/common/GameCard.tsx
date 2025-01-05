import { ReactElement } from "react";
import Link from "next/link";
import Image from 'next/image';
import { FavouriteButton } from "./FavouriteButton";
import { Game } from "@/types/types";
import { URL_GAME_DETAILS_PAGE } from "@/utils/utils";

import "./GameCard.css";

/**
 * Represents a card containing information about a game. The card is clickable so that
 * a user can navigate to the game's detail page if interested. It is also possible to
 * add a game card to the list of favourite games.
 * 
 * @param game          a game
 * @returns             a clickable card with game information
 */
export function GameCard({ game }: { game: Game }): ReactElement {
    return (
        <Link href={`${URL_GAME_DETAILS_PAGE}/${game.id}`}>
            <section className="gameCard">
                <figure className="gameCard-figure">
                    <Image 
                        src={game.imageLink}
                        className="gameCard-figure__cover"
                        alt="Game Cover"
                        width={100}
                        height={300}
                    />
                </figure>
                <article id="gameCardTitle">
                    <h1 className="gameCardTitle__heading">{game.title}</h1>
                    <FavouriteButton game={game} />
                </article>
            </section>
        </Link>
    );
}