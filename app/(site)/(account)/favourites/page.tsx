'use client';

import { ReactElement, useState } from "react";
import { useFavourites, useGame } from "@/app/_hooks";
import { GameSorting, ScrollTopButton } from "@/app/_components/common";
import { GameGrid, GameList, SlidingToggle } from "@/app/_components/lists";
import { Game } from "@/app/_types/types";

import "./page.css";

/**
 * Renders the current user's favourite games as game cards either in Grid view or List view.
 */
export default function FavouritesPage(): ReactElement {
    const { favouritesList } = useFavourites();
    const [favourites, setFavourites] = useState<Game[]>(favouritesList);
    const { gridView } = useGame();

    return (
        <main id="favouritesPage">
            {
                favouritesList.length > 0 ?
                        <section className="show-pagination-toggle">
                            <GameSorting games={favourites} setSortedGames={setFavourites} />
                            
                            <SlidingToggle />
                        </section>
                    : <h1> No favourites selected </h1>
            }

            { 
                favouritesList.length === 0 ? <></> : 
                        gridView ?  
                            <GameGrid games={favourites} />
                                    :
                            <GameList games={favourites} />
            }

            <ScrollTopButton />
        </main>
    );
}