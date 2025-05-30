'use client';

import { ReactElement, useContext, useState } from "react";
import { PAGINATION_PAGE_SIZE } from "@/app/_utils/utils";
import { FavouritePagination } from "@/app/_components/favourites/FavouritePagination";
import { FavouritesContext } from "@/app/_contexts/FavouritesContextProvider";
import { GameCard, GameList, GameModal, ListToggle, ScrollTopButton } from "@/app/_components/common";
import { arima } from "@/app/_fonts/fonts";
import { Game } from "@/app/_types/types";

import "./page.css";

export default function FavouritesPage(): ReactElement {
    const { favouritesList, favouritesPage, gridView, toggleGridView } = useContext(FavouritesContext);
    const [ chosenGame, setChosenGame ] = useState<Game>({} as Game);
    const [ openModal, setOpenModal ] = useState<boolean>(false);

    function from(page: number): number {
        return (page - 1) * PAGINATION_PAGE_SIZE;
    }
    
    function to(page: number): number {
        return (page - 1) * PAGINATION_PAGE_SIZE + PAGINATION_PAGE_SIZE;
    }

    function openGameModal(game: Game): void {
        setChosenGame(game);
        setOpenModal(true);
    }

    function closeGameModal(): void {
        setOpenModal(false);
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

            { openModal ? <GameModal game={chosenGame} close={() => closeGameModal()} /> : <></>}

            <section id="gameCards">
                { 
                    favouritesList.length === 0 ? 
                         <></> : 
                            gridView ?  favouritesList
                                            .slice(from(favouritesPage), to(favouritesPage))
                                            .map(game => <GameCard key={game.id} game={game} click={openGameModal} />) 
                                    :
                            <GameList games={favouritesList.slice(from(favouritesPage), to(favouritesPage))} page={favouritesPage} />
                }
            </section>

            <ScrollTopButton />

            {favouritesList.length > PAGINATION_PAGE_SIZE ? <FavouritePagination currentPage={favouritesPage} /> : <></>}
        </main>
    );
}