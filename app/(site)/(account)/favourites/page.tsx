'use client';

import { ReactElement, useEffect, useState } from "react";
import { useFavourites, useGame } from "@/app/_hooks";
import { GameSorting, ScrollTopButton } from "@/app/_components/common";
import { GameGrid, GameList, SlidingToggle } from "@/app/_components/lists";
import { Game } from "@/app/_db/schema/games";

import "./page.css";

/**
 * Renders the current user's favourite games as game cards either in Grid view or List view.
 */
export default function FavouritesPage(): ReactElement {
    const { favouritesList } = useFavourites();
    const [favourites, setFavourites] = useState<Game[]>(favouritesList);
    const { gridView } = useGame();

    useEffect(() => {
        setFavourites(favouritesList);
    }, [favouritesList])

    if (favourites.length < 1) {
        return (
            <main id="favouritesPage">
                <h1 className="no-favourites__text"> No favourite selected </h1>
            </main>
        );
    }

    return (
        <main id="favouritesPage">
            <section className="show-pagination-toggle">
                <GameSorting games={favourites} setSortedGames={setFavourites} />
                
                <SlidingToggle />
            </section>

            { 
                gridView ?  
                    <GameGrid games={favourites} />
                            :
                    <GameList games={favourites} />
            }

            <ScrollTopButton />
        </main>
    );
}