'use client';

import { ReactElement, useContext } from "react";
import { PAGINATION_PAGE_SIZE } from "@/utils/utils";
import { FavouritePagination } from "@/components/favourites/FavouritePagination";
import { FavouritesContext } from "@/contexts/FavouritesContextProvider";
import { GameCard } from "@/components/common";

import "./page.css";

export default function FavouritesPage(): ReactElement<ReactElement> {
    const { favouritesList, favouritesPage } = useContext(FavouritesContext);

    function from(page: number): number {
        return (page-1) * PAGINATION_PAGE_SIZE;
    }
    
    function to(page: number): number {
        return (page-1) * PAGINATION_PAGE_SIZE + PAGINATION_PAGE_SIZE;
    }

    return (
        <main id="favouritesPage">
            {favouritesList.length > PAGINATION_PAGE_SIZE ? <FavouritePagination currentPage={favouritesPage} /> : <></>}

            <section id="gameCards">
                { favouritesList.length === 0 ? 
                    <h1 className="no-favourites-text">{"No favourites selected"}</h1> : 
                    favouritesList.slice(from(favouritesPage), to(favouritesPage)).map(game => <GameCard key={game.id} game={game} />) }
            </section>

            {favouritesList.length > PAGINATION_PAGE_SIZE ? <FavouritePagination currentPage={favouritesPage} /> : <></>}
        </main>
    );
}