'use client';

import { ReactElement, useContext } from "react";
import { GameCard } from "@/components/common/GameCard";
import { FavouritesContext } from "@/contexts/FavouritesContextProvider";

import "./page.css";

export default function FavouritesPage(): ReactElement {
    const { favouritesList } = useContext(FavouritesContext);

    return (
        <main id="favouritesPage">
            <section id="gameCards">
                { favouritesList.length === 0 ? 
                    <h1 className="no-favourites-text">{"No favourites selected"}</h1> : 
                    favouritesList.map((game, index) => <GameCard key={index} game={game} />) }
            </section>
        </main>
    );
}