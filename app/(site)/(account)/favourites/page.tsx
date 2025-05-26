'use client';

import { ReactElement, useContext } from "react";
import { PAGINATION_PAGE_SIZE } from "@/app/_utils/utils";
import { FavouritePagination } from "@/app/_components/favourites/FavouritePagination";
import { FavouritesContext } from "@/app/_contexts/FavouritesContextProvider";
import { GameCard, GameList, ListToggle, ScrollTopButton } from "@/app/_components/common";
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
                        <section className="show-pagination-toggle">
                            <h1 className={`tag ${arima.className}`}>
                                {favouritesList.length} favourite{ favouritesList.length === 1 ? "" : "s" } 
                            </h1>

                            {
                                favouritesList.length > PAGINATION_PAGE_SIZE ?
                                    <FavouritePagination currentPage={favouritesPage} /> 
                                    : <></>
                            }

                            <ListToggle toggle={toggleGridView} initialState={gridView} />
                        </section>
                    </>
                    : <h1 className="tag"> No favourites </h1>
            }

            <section id="gameCards">
                { 
                    favouritesList.length === 0 ? 
                         <></> : 
                            gridView ?  favouritesList
                                            .slice(from(favouritesPage), to(favouritesPage))
                                            .map(game => <GameCard key={game.id} game={game} />) 
                                    :
                            <GameList games={favouritesList.slice(from(favouritesPage), to(favouritesPage))} page={favouritesPage} />
                }
            </section>

            <ScrollTopButton />

            {favouritesList.length > PAGINATION_PAGE_SIZE ? <FavouritePagination currentPage={favouritesPage} /> : <></>}
        </main>
    );
}