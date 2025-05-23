import { ReactElement } from "react";
import { Game } from "@/app/_types/types";

import "./GameList.css";

export function GameList({ games }: { games: Game[] }): ReactElement {
    return (
        <ul id="gameList">
            {
                games.map(game => 
                    <li key={game.id}>

                    </li>
                )
            }
        </ul>
    );
}