'use client';

import { ReactElement } from "react";
import { useSearchParams } from 'next/navigation';
import { arima } from "@/fonts/fonts";
import { Game } from "@/types/types";
import { getGames } from "@/data/data";

import "./Pagination.css";

export function Pagination({ currentPage, setCurrentPage, totalPages, setSearchResult }: { currentPage: number, setCurrentPage: (page: number) => void, totalPages: number, setSearchResult: (games: Game[]) => void }): ReactElement<ReactElement> {
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

    async function searchPage(page: string) {
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
                disabled={currentPage > 1 ? false : true}>
                    Previous
            </button>
            
            <div className={`pagination-page__text ${arima.className}`}>Page <p className="pagination-page__number">{currentPage} / {totalPages} </p></div>
            
            <button 
                id="next" 
                className={`gameButton ${arima.className}`}
                onClick={() => nextPage()} 
                disabled={currentPage < totalPages ? false : true}>
                    Next
            </button>
        </section>
    );
}