import { ReactElement, useState } from "react";
import Image from 'next/image';
import { Game } from "@/app/_types/types";
import { FavouriteButton } from "../../favourites";

import "./GameListEntry.css";

export function GameListEntry({ game }: { game: Game }): ReactElement {
    const [ removeCard, setRemoveCard ] = useState<boolean>(false);
    const STORAGE_URL = process.env.NEXT_PUBLIC_COVER;

    return (
        <li key={game.id} className={removeCard ? "hidden" : "gameListEntry"}>
            <Image 
                src={STORAGE_URL + game.cover}
                unoptimized
                className="gameCard-figure__cover"
                alt="Game Cover"
                width={100}
                height={100}
            />

            <h2 className="gameCard-title"> {game.title} </h2>
            <h2 className="gameCard-category"> {game.category} </h2>
            <h2 className="gameCard-players"> {game.players} </h2>
            <h2 className="gameCard-developer"> {game.developer} </h2>
            <h2 className="gameCard-publisher"> {game.publisher} </h2>
            <FavouriteButton game={game} setFading={() => {}} removeCard={setRemoveCard} />
        </li>
    );
}