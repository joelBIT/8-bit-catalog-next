'use client';

import { ReactElement, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { GameContext } from "@/app/_contexts";
import { getGames } from "@/app/_client/client";
import { Game } from "@/app/_types/types";
import { PAGINATION_PAGE_SIZE } from "@/app/_utils/utils";
import { SlidingToggle, ScrollTopButton, GameList, GameGrid } from "../common";
import { Pagination } from ".";

import "./Search.css";

/**
 * Searches for games that matches the supplied filter values as well as the given title text.
 * The searchResult state contains the games that matches the search query. The showHeading state
 * is set on each search to inform the user about how many games that matches the search query.
 */
export function Search(): ReactElement {
    const { gridView } = useContext(GameContext);
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
        if ((title || category || developer || publisher)) {    // Query params
            search();                   // Perform a search on query params
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

    return (
        <section id="search">
            {
                searchResult.length > 0 ? 
                    <>
                        <h1 className="search-result-text"> {`Found ${totalCount} game${searchResult.length > 1 ? "s" : ""} for "${title}"`} </h1>
                        <section className="show-pagination-toggle">
                            <div className="invisible" />

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

                            { searchResult.length > 0 ? <SlidingToggle /> : <></> }
                        </section>

                        { 
                            gridView ?
                                <GameGrid games={searchResult} page={currentPage} />
                                :
                                <GameList games={searchResult} page={currentPage} />
                        }
                    </>
                :   <>
                        { 
                            showHeading ? 
                                <h1 className="search-result-text"> No games found </h1>
                            : <></>
                        }
                    </>   
            }
        
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