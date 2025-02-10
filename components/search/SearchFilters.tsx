'use client';

import { ReactElement, useRef, useState } from "react";
import { arima, rancho } from "@/fonts/fonts";
import { ALL_OPTION_VALUE, getCategories } from "@/utils/utils";
import { getGames } from "@/data/data";
import { Game, SearchFilter } from "@/types/types";
import { SearchResult } from "./SearchResult";

import "./SearchFilters.css";

/**
 * Searches for games that matches the supplied filter values as well as the given title text.
 * The searchResult state contains the games that matches the search query. The showHeading state
 * is set on each search to inform the user about how many games that matches the search query.
 */
export function SearchFilters({ developers, publishers } : { developers: string[], publishers: string[] }): ReactElement {
    const [ searchResult, setSearchResult ] = useState<Game[]>([]);
    const [ showHeading, setShowHeading ] = useState<boolean>(false);
    const titleRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const developerRef = useRef<HTMLSelectElement>(null);
    const publisherRef = useRef<HTMLSelectElement>(null);

    /**
     * Performs a search based on given title text and filters. The search is executed either
     * when the button is pressed or when the Enter key is pressed in the input field.
     */
    async function search() {
        const searchFilters: SearchFilter = {
            title: titleRef.current?.value || '',
            category: categoryRef.current?.value || ALL_OPTION_VALUE,
            developer: developerRef.current?.value || ALL_OPTION_VALUE,
            publisher: publisherRef.current?.value || ALL_OPTION_VALUE
        }

        setSearchResult(await getGames(searchFilters));
        setShowHeading(true);
    }

    return (
        <section id="searchForm">
            <h1 className={`searchForm__title ${rancho.className}`}>Search Games</h1>
                <section id="searchFilters">
                    <article className="searchForm__filters">

                        <section className="selectSection">
                            <h2 className={`selectSection__title ${arima.className}`}>{'Category'}</h2>
                            <select className="selectSection__select" ref={categoryRef}>
                                {getCategories().map((element, index) => <option key={index} value={element}>{element}</option>)}
                            </select>
                        </section>

                        <section className="selectSection">
                            <h2 className={`selectSection__title ${arima.className}`}>{'Publisher'}</h2>
                            <select className="selectSection__select" ref={publisherRef}>
                                {publishers.map((element, index) => <option key={index} value={element}>{element}</option>)}
                            </select>
                        </section>

                        <section className="selectSection">
                            <h2 className={`selectSection__title ${arima.className}`}>{'Developer'}</h2>
                            <select className="selectSection__select" ref={developerRef}>
                                {developers.map((element, index) => <option key={index} value={element}>{element}</option>)}
                            </select>
                        </section>

                    </article>

                    <article id="searchInput">
                        <input 
                            id="searchTitle"
                            ref={titleRef}
                            className={arima.className} 
                            type="text"
                            placeholder="Game Title"
                        />

                        <button className={`gameButton ${arima.className}`} onClick={search}> Search </button>
                    </article>
                </section>
                
            <SearchResult result={searchResult} showHeading={showHeading} />
        </section>
    );
}