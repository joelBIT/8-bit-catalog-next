'use client';

import { ReactElement, useContext } from "react";
import { FavouritesContext } from "@/app/_contexts/FavouriteContextProvider";
import { arima } from "@/app/_fonts/fonts";

import "./FavouritePagination.css";

/**
 * Pagination is used to navigate between pages of favourite games.
 */
export function FavouritePagination({ currentPage }: { currentPage: number }): ReactElement {
    const { setFavouritesPage, totalPages } = useContext(FavouritesContext);

    /**
     * Updates the Context with the current page number when navigating between pages.
     */
    function nextPage(): void {
        setFavouritesPage((currentPage + 1));
    }

    function previousPage(): void {
        setFavouritesPage((currentPage - 1));
    }

    return (
        <section className="favourite-pagination">
            <button 
                id="previous" 
                className={`prevButton ${arima.className}`}
                onClick={() => previousPage()} 
                disabled={currentPage <= 1}
            >
                <span className="arrow" />
            </button>
            
            <div className={`favourite-pagination-page__text ${arima.className}`}>
                Page 
                <p className="favourite-pagination-page__number">
                    {currentPage} / {totalPages} 
                </p>
            </div>
            
            <button 
                id="next" 
                className={`nextButton ${arima.className}`}
                onClick={() => nextPage()} 
                disabled={currentPage >= totalPages}
            >
                <span className="arrow" />
            </button>
        </section>
    );
}