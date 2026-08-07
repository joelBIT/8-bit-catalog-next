'use client';

import { ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import Form from 'next/form';
import { useSearchParams } from "next/navigation";
import { useGames, useOptions } from "@/app/_hooks";
import { SearchButton, SearchResultOptions } from "@/app/_components/search";
import { addAllOption, sortGames, URL_SEARCH_PAGE } from "@/app/_utils/utils";
import { Game } from "@/app/_db/schema/games";
import { ScrollTopButton } from "@/app/_components/common";

import "./page.css";

/**
 * The search params are used to get the desired search results/page.
 */
export default function SearchPage(): ReactElement {
    const [searchResult, setSearchResult] = useState<Game[]>([]);
    const [showHeading, setShowHeading] = useState<boolean>(false);
    const [totalCount, setTotalCount] = useState<number>();
    const { filterValues, sortOrder } = useOptions();
    const { games, getFilteredGames } = useGames();

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const title = params.get('title') || '';
    const category = params.get('category') as string;
    const developer = params.get('developer') as string;
    const publisher = params.get('publisher') as string;

    useEffect(() => {
        if ((title || category || developer || publisher)) {    // Query params (These exists only if a search has already been performed)
            search();                   // Perform a search on query params
        }
    }, [title, category, developer, publisher])

    /**
     * Handle page refresh.
     */
    useEffect(() => {
        if (games.length && showHeading) {      // When showHeading is true a search has taken place earlier.
            search();           // Perform a search again when page is refreshed to show the same results as before the refresh
        }
    }, [games.length])          // Length of games become 0 when refreshing the page because the context is emptied and must retrieve games again.

    /**
     * Performs a search based on given title text and filters.
     */
    async function search(): Promise<void> {
        const filteredGames = getFilteredGames({title, category, developer, publisher});
        setSearchResult(sortGames(filteredGames, sortOrder));
        setTotalCount(filteredGames.length);
        setShowHeading(true);           // Set to true after first search is executed
    }

    let content = <> { showHeading ? <h1 className="search-result-text message-failure"> No games found </h1> : <></> } </>;

    if (searchResult.length > 0) {
        content = <>
            <h1 className="search-result-text message-success"> {`Found ${totalCount} game${searchResult.length > 1 ? "s" : ""}`} </h1>
            <SearchResultOptions searchResult={searchResult} setSortedGames={setSearchResult} />
        </>
    }

    return (
        <main id="searchPage">
            <figure id="search-figure">
                <Image 
                    src={URL_SEARCH_PAGE + "/nes-game-cartridges-hero.avif"}
                    className="search-image" 
                    alt="Search image" 
                    width={1232} 
                    height={480} 
                    loading="eager" 
                    placeholder="blur"
                    blurDataURL={URL_SEARCH_PAGE + "/nes-game-cartridges-hero.avif"}
                />

                <section className="searchPage-heading">
                    <h1 className="searchPage-title">SEARCH THE GAMES DATABASE</h1>
                    <p className="searchPage-text">The 8-bit Catalog provides metadata for all NES games.</p>
                </section>

                <Form id="searchFilters__form" action="" scroll={false}>
                    <search id="searchInput">
                        <section className="input-wrapper">
                            <span className="material-symbols-outlined"> search </span>
                            <input 
                                id="searchTitle"
                                name="title"
                                type="text"
                                placeholder={(title && title.length > 0) ? title : "Game Title"}
                            />
                        </section>

                        <SearchButton />
                    </search>

                    <article className="searchFilters__filters">
                        <section className="selectSection">
                            <h2 className="selectSection__title"> Category </h2>
                
                            <select className="selectSection__select" name="category" defaultValue={category}>
                                { addAllOption(filterValues.categories).map((element, index) => <option key={index} value={element}> {element} </option>) }
                            </select>
                        </section>

                        <section className="selectSection">
                            <h2 className="selectSection__title"> Publisher </h2>
                
                            <select className="selectSection__select" name="publisher" defaultValue={publisher}>
                                { addAllOption(filterValues.publishers).map((element, index) => <option key={index} value={element}> {element} </option>) }
                            </select>
                        </section>
                        
                        <section className="selectSection">
                            <h2 className="selectSection__title"> Developer </h2>
                
                            <select className="selectSection__select" name="developer" defaultValue={developer}>
                                { addAllOption(filterValues.developers).map((element, index) => <option key={index} value={element}> {element} </option>) }
                            </select>
                        </section>
                    </article>
                </Form>
            </figure>

            <section id="search">
                {content}
                    
                <ScrollTopButton />
            </section>

            <div className="darken-image-bottom" />
        </main>
    );
}