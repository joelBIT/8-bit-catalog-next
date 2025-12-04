'use client';

import { ReactElement, useContext } from "react";
import { FavouritesContext } from "@/app/_contexts/FavouriteContextProvider";

import "./Pagination.css";

/**
 * Pagination is used to navigate between pages of favourite games.
 */
export function Pagination({ currentPage }: { currentPage: number }): ReactElement {
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
        <section className="pagination">
            <button 
                id="previous" 
                className="prevButton"
                onClick={() => previousPage()} 
                disabled={currentPage <= 1}
            >
                <span className="arrow" />
            </button>
            
            <div className="pagination-page__text">
                Page 
                <p className="pagination-page__number">
                    {currentPage} / {totalPages} 
                </p>
            </div>
            
            <button 
                id="next" 
                className="nextButton"
                onClick={() => nextPage()} 
                disabled={currentPage >= totalPages}
            >
                <span className="arrow" />
            </button>
        </section>
    );
}