'use client';

import { ReactElement, useContext } from "react";
import { FavouritesContext } from "@/app/_contexts/FavouritesContextProvider";
import { arima } from "@/fonts/fonts";

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
                className={`gameButton ${arima.className}`}
                onClick={() => previousPage()} 
                disabled={currentPage <= 1}>
                    <span className="material-symbols-outlined"> chevron_left </span>
            </button>
            
            <div className={`favourite-pagination-page__text ${arima.className}`}>
                Page 
                <p className="favourite-pagination-page__number">
                    {currentPage} / {totalPages} 
                </p>
            </div>
            
            <button 
                id="next" 
                className={`gameButton ${arima.className}`}
                onClick={() => nextPage()} 
                disabled={currentPage >= totalPages}>
                    <span className="material-symbols-outlined"> chevron_right </span>
            </button>
        </section>
    );
}