'use client';

import { ReactElement, useContext } from "react";
import { PAGINATION_PAGE_SIZE } from "@/app/_utils/utils";
import { FavouritePagination } from "@/app/_components/favourites/FavouritePagination";
import { FavouritesContext, GameContext } from "@/app/_contexts";
import { GameGrid, GameList, ListToggle, ScrollTopButton } from "@/app/_components/common";
import { arima } from "@/app/_fonts/fonts";

import "./page.css";

export default function FavouritesPage(): ReactElement {
    const { favouritesList, favouritesPage } = useContext(FavouritesContext);
    const { gridView } = useContext(GameContext);

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

                            <ListToggle />
                        </section>
                    </>
                    : <h1 className="tag"> No favourites </h1>
            }

            { 
                favouritesList.length === 0 ? 
                        <></> : 
                        gridView ?  
                        <GameGrid games={favouritesList.slice(from(favouritesPage), to(favouritesPage))} page={favouritesPage} />
                                :
                        <GameList games={favouritesList.slice(from(favouritesPage), to(favouritesPage))} page={favouritesPage} />
            }

            <ScrollTopButton />

            {favouritesList.length > PAGINATION_PAGE_SIZE ? <FavouritePagination currentPage={favouritesPage} /> : <></>}
        </main>
    );
}