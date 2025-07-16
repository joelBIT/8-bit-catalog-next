'use client';

import { ReactElement } from "react";
import { useSearchParams } from 'next/navigation';
import { arima } from "@/app/_fonts/fonts";
import { Game } from "@/app/_types/types";
import { getGames } from "@/app/_client/client";

import "./Pagination.css";

/**
 * Pagination is used to navigate between pages of a search result. Pressing the Previous or Next button invokes a call to the database to retrieve
 * the desired page of a search result. Pressing any page number link invokes a call to the database to retrieve the desired page of a search result.
 */
export function Pagination({ currentPage, setCurrentPage, totalPages, setSearchResult }: { currentPage: number, setCurrentPage: (page: number) => void, totalPages: number, setSearchResult: (games: Game[]) => void }): ReactElement {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const title = params.get('title') as string;
    const category = params.get('category') as string;
    const developer = params.get('developer') as string;
    const publisher = params.get('publisher') as string;
    const pages = Array.from({length: totalPages}, (_, i) => i + 1);

    async function nextPage(): Promise<void> {
        await searchPage((currentPage + 1).toString());
    }

    async function previousPage(): Promise<void> {
        await searchPage((currentPage - 1).toString());
    }

    async function selectedPage(pageNumber: number): Promise<void> {
        if (pageNumber !== currentPage) {
            await searchPage(pageNumber.toString());
        }
    }

    /**
     * Updates the URL with the current page number when navigating between pages.
     */
    async function searchPage(page: string): Promise<void> {
        params.delete('page');
        params.set('page', page);
        window.history.pushState(null, '', `?${params.toString()}`);
        setCurrentPage(parseInt(page));
        const result = await getGames({title, category, developer, publisher, page});
        setSearchResult(result.games);
    }

    return (
        <section className="pagination">
            <button 
                id="previous" 
                className={`prevButton ${arima.className}`}
                onClick={() => previousPage()} 
                disabled={currentPage <= 1}
            >
                <span className="arrow" />
            </button>
            
            <div className={`pagination-page__text ${arima.className}`}>
                {
                    pages.map(page => page > currentPage - 4 && page < currentPage + 4 ?
                        <p
                            key={page}
                            className={`pagination-page__number ${page === currentPage ? "bolder" : ""}`}
                            onClick={() => selectedPage(page)}
                        >
                            {page}
                        </p>
                        : <></>
                    )
                }

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