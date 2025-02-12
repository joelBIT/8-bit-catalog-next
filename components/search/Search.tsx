'use client';

import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getGames } from "@/data/data";
import { Game } from "@/types/types";
import { PAGINATION_PAGE_SIZE } from "@/utils/utils";
import { Pagination } from "./Pagination";
import { GameCard } from "../common/GameCard";
import { arima } from "@/fonts/fonts";

import "./Search.css";

/**
 * Searches for games that matches the supplied filter values as well as the given title text.
 * The searchResult state contains the games that matches the search query. The showHeading state
 * is set on each search to inform the user about how many games that matches the search query.
 */
export function Search(): ReactElement<ReactElement> {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const page =  params.get('page') as string || '1';
    const title = params.get('title') || '';
    const category = params.get('category') as string;
    const developer = params.get('developer') as string;
    const publisher = params.get('publisher') as string;
    const [ searchResult, setSearchResult ] = useState<Game[]>([]);
    const [ showHeading, setShowHeading ] = useState<boolean>(false);
    const [ currentPage, setCurrentPage ] = useState<number>(parseInt(page));
    const [ totalCount, setTotalCount ] = useState<number>();
    const [ totalPages, setTotalPages ] = useState<number>(1);
    
    useEffect(() => {
        if ((title || category || developer || publisher)) {
            search();
        }
    }, [title, category, developer, publisher])

    /**
     * Performs a search based on given title text and filters. The search is executed either
     * when the button is pressed or when the Enter key is pressed in the input field.
     */
    async function search() {
        const result = await getGames({title, category, developer, publisher, page});
        setSearchResult(result.games);
        setTotalCount(result.count);
        setTotalPages(Math.floor(result.count / PAGINATION_PAGE_SIZE) + 1);
        setCurrentPage(parseInt(page) || 1);
        setShowHeading(true);
    }

    return (
        <section id="search">
            { showHeading ? <h1 className={`searchResult__title ${arima.className}`}>
                                Games found: <p className="searchResult__games-found">{totalCount}</p>
                            </h1> 
                        : <></>
            }

            {totalPages > 1 ? <Pagination currentPage={currentPage} 
                setCurrentPage={setCurrentPage} setSearchResult={setSearchResult} totalPages={totalPages} /> : <></>}

            <section id="gameCards">
                {searchResult.map((game, index) => <GameCard key={index} game={game} />)}
            </section>

            {totalPages > 1 ? <Pagination currentPage={currentPage} 
                setCurrentPage={setCurrentPage} setSearchResult={setSearchResult} totalPages={totalPages} /> : <></>}
        </section>
    );
}