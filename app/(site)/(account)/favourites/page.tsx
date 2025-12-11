'use client';

import { ReactElement } from "react";
import { useFavourites, useGame } from "@/app/_hooks";
import { ScrollTopButton } from "@/app/_components/common";
import { GameGrid, GameList, SlidingToggle } from "@/app/_components/lists";

import "./page.css";

/**
 * Renders the current user's favourite games as game cards either in Grid view or List view.
 */
export default function FavouritesPage(): ReactElement {
    const { favouritesList } = useFavourites();
    const { gridView } = useGame();

    return (
        <main id="favouritesPage">
            {
                favouritesList.length > 0 ?
                        <section className="show-pagination-toggle">
                            <div className="invisible" />
                            <SlidingToggle />
                        </section>
                    : <h1> No favourites selected </h1>
            }

            { 
                favouritesList.length === 0 ? <></> : 
                        gridView ?  
                            <GameGrid games={favouritesList} />
                                    :
                            <GameList games={favouritesList} />
            }

            <ScrollTopButton />
        </main>
    );
}