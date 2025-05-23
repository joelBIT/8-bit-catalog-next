'use client';

import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getGames } from "@/app/_client/client";
import { Game } from "@/app/_types/types";
import { PAGINATION_PAGE_SIZE } from "@/app/_utils/utils";
import { GameCard, ListToggle, ScrollTopButton, GameList } from "../common";
import { Pagination } from ".";
import { arima } from "@/app/_fonts/fonts";

import "./Search.css";

/**
 * Searches for games that matches the supplied filter values as well as the given title text.
 * The searchResult state contains the games that matches the search query. The showHeading state
 * is set on each search to inform the user about how many games that matches the search query.
 */
export function Search(): ReactElement {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const page =  params.get('page') as string || '1';
    const title = params.get('title') || '';
    const category = params.get('category') as string;
    const developer = params.get('developer') as string;
    const publisher = params.get('publisher') as string;
    const listView = params.get('listView') as string;
    const [ searchResult, setSearchResult ] = useState<Game[]>([]);
    const [ showHeading, setShowHeading ] = useState<boolean>(false);
    const [ currentPage, setCurrentPage ] = useState<number>(parseInt(page));
    const [ totalCount, setTotalCount ] = useState<number>();
    const [ totalPages, setTotalPages ] = useState<number>(1);
    const [ gridView, setGridView ] = useState<boolean>(!listView);
    
    useEffect(() => {
        if ((title || category || developer || publisher)) {    // Query params
            search();                   // Perform a search on query params when navigating back to this page
        }
    }, [title, category, developer, publisher])

    /**
     * Performs a search based on given title text and filters. The search is executed either
     * when the button is pressed or when the Enter key is pressed in the input field.
     */
    async function search(): Promise<void> {
        const result = await getGames({title, category, developer, publisher, page});
        setSearchResult(result.games);
        setTotalCount(result.count);
        setTotalPages(Math.floor(result.count / PAGINATION_PAGE_SIZE) + 1);
        setCurrentPage(parseInt(page) || 1);
        setShowHeading(true);
    }

    /**
     * Keep track of which view the user had when navigating back from a game's detail page.
     */
    function toggleGridView(): void {
        params.delete('listView');
        if (gridView) {
            params.set('listView', "true");
        }
        window.history.pushState(null, '', `?${params.toString()}`);

        setGridView(!gridView);
    }

    return (
        <section id="search">
            { 
                showHeading ? 
                    <h1 className={`searchResult__title ${arima.className}`}>
                        Games found: 
                        <p className="searchResult__games-found"> {totalCount} </p>
                    </h1> 
                : <></>
            }

            <section className="show-pagination-toggle">
            {
                searchResult.length > 0 ?
                    <ListToggle toggle={toggleGridView} initialState={gridView} />
                    : <></>
            }

            {
                totalPages > 1 ?
                     <Pagination 
                        currentPage={currentPage} 
                        setCurrentPage={setCurrentPage} 
                        setSearchResult={setSearchResult} 
                        totalPages={totalPages} 
                    /> 
                : <></>
            }

                <div className="invisible" />
            </section>

            <section id="gameCards">
                { 
                    gridView ?
                        searchResult.map((game, index) => <GameCard key={index} game={game} />)
                        :
                        <GameList games={searchResult} />
                }
            </section>

            <ScrollTopButton />

            {
                totalPages > 1 ? 
                    <Pagination 
                        currentPage={currentPage} 
                        setCurrentPage={setCurrentPage}
                        setSearchResult={setSearchResult} 
                        totalPages={totalPages} 
                    /> 
                : <></>
            }
        </section>
    );
}