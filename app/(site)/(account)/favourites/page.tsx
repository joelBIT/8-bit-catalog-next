'use client';

import { ReactElement, useContext } from "react";
import { useGame } from "@/app/_hooks";
import { FavouritesContext } from "@/app/_contexts";
import { GameGrid, GameList, SlidingToggle, ScrollTopButton } from "@/app/_components/common";

import "./page.css";
/**
 * Renders the current user's favourite games as game cards either in Grid view or List view.
 */
export default function FavouritesPage(): ReactElement {
    const { favouritesList } = useContext(FavouritesContext);
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