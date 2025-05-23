import { ReactElement } from "react";
import Image from 'next/image';
import { Game } from "@/app/_types/types";

import "./GameList.css";

export function GameList({ games }: { games: Game[] }): ReactElement {
    const STORAGE_URL = process.env.NEXT_PUBLIC_COVER;

    return (
        <ul id="gameList">
            
            {
                games.map(game => 
                    <li key={game.id} className="gameList-row">
                        <Image 
                            src={STORAGE_URL + game.cover}
                            unoptimized
                            className="gameCard-figure__cover"
                            alt="Game Cover"
                            width={100}
                            height={300}
                        />

                        <h2 className="gameCard-title"> {game.title} </h2>
                        <h2 className="gameCard-category"> {game.category} </h2>
                    </li>
                )
            }
        </ul>
    );
}