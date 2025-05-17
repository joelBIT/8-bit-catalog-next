'use client';

import { ReactElement } from "react";
import { useSearchParams } from 'next/navigation';
import { arima } from "@/fonts/fonts";
import { Game } from "@/app/_types/types";
import { getGames } from "@/app/_client/client";

import "./Pagination.css";

/**
 * Pagination is used to navigate between pages of a search result. Pressing the Previous or Next button invokes a call to the database to retrieve
 * the desired page of a search result.
 */
export function Pagination({ currentPage, setCurrentPage, totalPages, setSearchResult }: { currentPage: number, setCurrentPage: (page: number) => void, totalPages: number, setSearchResult: (games: Game[]) => void }): ReactElement {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const title = params.get('title') as string;
    const category = params.get('category') as string;
    const developer = params.get('developer') as string;
    const publisher = params.get('publisher') as string;

    async function nextPage(): Promise<void> {
        await searchPage((currentPage + 1).toString());
    }

    async function previousPage(): Promise<void> {
        await searchPage((currentPage - 1).toString());
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
                className={`gameButton ${arima.className}`}
                onClick={() => previousPage()} 
                disabled={currentPage <= 1}>
                    <span className="material-symbols-outlined"> chevron_left </span>
            </button>
            
            <div className={`pagination-page__text ${arima.className}`}>
                Page 
                <p className="pagination-page__number">
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