'use client';

import { ReactElement, useContext } from "react";
import { useGame } from "@/app/_hooks";
import { PAGINATION_PAGE_SIZE } from "@/app/_utils/utils";
import { Pagination } from "@/app/_components/favourites/Pagination";
import { FavouritesContext } from "@/app/_contexts";
import { GameGrid, GameList, SlidingToggle, ScrollTopButton } from "@/app/_components/common";

import "./page.css";
/**
 * Renders the current user's favourite games as game cards either in Grid view or List view.
 */
export default function FavouritesPage(): ReactElement {
    const { favouritesList, favouritesPage } = useContext(FavouritesContext);
    const { gridView } = useGame();

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
                            <div className="invisible" />

                            {
                                favouritesList.length > PAGINATION_PAGE_SIZE ?
                                    <Pagination currentPage={favouritesPage} /> 
                                    : <></>
                            }

                            <SlidingToggle />
                        </section>
                    </>
                    : <h1> No favourites selected </h1>
            }

            { 
                favouritesList.length === 0 ? <></> : 
                        gridView ?  
                            <GameGrid games={favouritesList.slice(from(favouritesPage), to(favouritesPage))} page={favouritesPage} />
                                    :
                            <GameList games={favouritesList.slice(from(favouritesPage), to(favouritesPage))} page={favouritesPage} />
            }

            <ScrollTopButton />

            {favouritesList.length > PAGINATION_PAGE_SIZE ? <Pagination currentPage={favouritesPage} /> : <></>}
        </main>
    );
}