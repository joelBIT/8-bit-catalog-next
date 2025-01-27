'use client';

import { ReactElement, useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { GameCard } from "../common/GameCard";
import { arima } from "@/fonts/fonts";
import { Game } from "@/types/types";
import { PAGINATION_PAGE_SIZE } from "@/utils/utils";

import "./SearchResult.css";

export function SearchResult({ result, showHeading }: { result: Game[], showHeading: boolean }): ReactElement {
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    let totalPages = Math.floor(result.length / PAGINATION_PAGE_SIZE) + 1;

    /**
     * Resets the current page to 1 every time a new search is performed. The number of total pages is also
     * updated accordingly.
     */
    useEffect(() => {
        setCurrentPage(1);
        totalPages = Math.floor(result.length / PAGINATION_PAGE_SIZE) + 1;
    }, [result]);

    /**
     * Calculates the start position of games to display for the user, based on the current page and the pagination page size.
     * 
     * @returns     the start position in the list of games to display
     */
    function from(): number {
        return (currentPage-1) * PAGINATION_PAGE_SIZE;
    }

    /**
     * Calculates the end position of games to display for the user, based on the current page and the pagination page size.
     * 
     * @returns     the end position in the list of games to display
     */
    function to(): number {
        return (currentPage-1) * PAGINATION_PAGE_SIZE + PAGINATION_PAGE_SIZE;
    }
    
    return (
        <section id="searchResult">
            { showHeading ? <h1 
                                className={`searchResult__title ${arima.className}`}
                            >
                                Games found: <p className="searchResult__games-found">{result.length}</p>
                            </h1> 
                        : <></>
            }

            {totalPages > 1 ? <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} /> : <></>}

            <section id="gameCards">
                {result.slice(from(), to()).map((game, index) => <GameCard key={index} game={game} />)}
            </section>

            {totalPages > 1 ? <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} /> : <></>}
        </section>
    );
}