'use client';

import { ReactElement, useEffect, useState } from "react";
import { useFavourites, useGame } from "@/app/_hooks";
import { GameSorting, ScrollTopButton } from "@/app/_components/common";
import { GameGrid, GameList, SlidingToggle } from "@/app/_components/lists";
import { Game } from "@/app/_db/schema/games";

import "./page.css";

/**
 * Renders the current user's game collection as game cards either in Grid view or List view.
 */
export default function CollectionPage(): ReactElement {
    const { favouritesList } = useFavourites();
    const [favourites, setFavourites] = useState<Game[]>(favouritesList);
    const { gridView } = useGame();

    useEffect(() => {
        setFavourites(favouritesList);
    }, [favouritesList])

    if (favourites.length < 1) {
        return (
            <main id="favouritesPage">
                <FavouriteHeading />

                <h1 className="no-favourites__text"> Collection is empty </h1>
                <div className="darken-image-bottom" />
            </main>
        );
    }

    return (
        <main id="favouritesPage">
            <FavouriteHeading />

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
            <div className="darken-image-bottom" />
        </main>
    );
}

function FavouriteHeading(): ReactElement {
    return (
        <section className="favourites-heading">
            <div className="favourites-title">
                Game Collection
            </div>

            <p className="favourites-text">
                Build your collection of games
            </p>
        </section>
    );
}