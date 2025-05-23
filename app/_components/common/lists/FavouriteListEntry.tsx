import { ReactElement, useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import { Game } from "@/app/_types/types";
import { URL_GAME_DETAILS_PAGE } from "@/app/_utils/utils";
import { FavouriteButton } from "../../favourites";

import "./FavouriteListEntry.css";

/**
 * An entry in the list of favourite games. Corresponds to a row in a regular list in List View.
 */
export function FavouriteListEntry({ game }: { game: Game }): ReactElement {
    const [ removeCard, setRemoveCard ] = useState<boolean>(false);
    const STORAGE_URL = process.env.NEXT_PUBLIC_COVER;

    return (
        <li key={game.id} className={removeCard ? "hidden" : "favouriteListEntry"}>
            <Link href={`${URL_GAME_DETAILS_PAGE}/${game.id}`}>
                <Image 
                    src={STORAGE_URL + game.cover}
                    unoptimized
                    className="gameCard-figure__cover"
                    alt="Game Cover"
                    width={100}
                    height={100}
                />
            </Link>

            <h2 className="gameCard-title"> 
                <Link href={`${URL_GAME_DETAILS_PAGE}/${game.id}`}> 
                    {game.title} 
                </Link> 
            </h2>
            
            <h2 className="gameCard-category"> {game.category} </h2>
            <h2 className="gameCard-players"> {game.players} </h2>
            <h2 className="gameCard-developer"> {game.developer} </h2>
            <h2 className="gameCard-publisher"> {game.publisher} </h2>

            <FavouriteButton game={game} setFading={() => {}} removeCard={setRemoveCard} />
        </li>
    );
}