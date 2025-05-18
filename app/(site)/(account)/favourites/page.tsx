'use client';

import { ReactElement, useContext } from "react";
import { PAGINATION_PAGE_SIZE } from "@/app/_utils/utils";
import { FavouritePagination } from "@/app/_components/favourites/FavouritePagination";
import { FavouritesContext } from "@/app/_contexts/FavouritesContextProvider";
import { GameCard, ListGameCard, ListToggle, ScrollTopButton } from "@/app/_components/common";
import { arima } from "@/app/_fonts/fonts";

import "./page.css";

export default function FavouritesPage(): ReactElement {
    const { favouritesList, favouritesPage, gridView, toggleGridView } = useContext(FavouritesContext);

    function from(page: number): number {
        return (page - 1) * PAGINATION_PAGE_SIZE;
    }
    
    function to(page: number): number {
        return (page - 1) * PAGINATION_PAGE_SIZE + PAGINATION_PAGE_SIZE;
    }

    return (
        <main id="favouritesPage">
            {
                favouritesList.length > 0 ?
                    <>
                        <h1 className={`number-favourites-text ${arima.className}`}>
                            {favouritesList.length} favourite { favouritesList.length === 1 ? "game" : "games" } 
                        </h1>

                        <section className="show-pagination-toggle">
                            <ListToggle toggle={toggleGridView} initialState={gridView} />

                            {
                                favouritesList.length > PAGINATION_PAGE_SIZE ?
                                    <FavouritePagination currentPage={favouritesPage} /> 
                                    : <></>
                            }

                            <div className="invisible" />
                        </section>
                    </>
                    : <></>
            }

            <section id="gameCards">
                { 
                    favouritesList.length === 0 ? 
                        <h1 className="no-favourites-text"> No favourites selected </h1> :
                        favouritesList.slice(from(favouritesPage), to(favouritesPage)).map(game => gridView ? <GameCard key={game.id} game={game} /> : <ListGameCard key={game.id} game={game} />) 
                }
            </section>

            <ScrollTopButton />

            {favouritesList.length > PAGINATION_PAGE_SIZE ? <FavouritePagination currentPage={favouritesPage} /> : <></>}
        </main>
    );
}