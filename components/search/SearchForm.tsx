'use client';

import { ReactElement, useEffect, useState } from "react";
import { SearchInput } from "./SearchInput";
import { rancho } from "@/fonts/fonts";
import { addAllOption, ALL_OPTION_VALUE, getCategories } from "@/utils/utils";
import { Select } from "../common/Select";
import { getAllGames } from "@/data/data";

import "./SearchForm.css";

export function SearchForm({ search }: { search: (title: string, category: string, publisher: string, developer: string) => void }): ReactElement {
    const [category, setCategory] = useState<string>(ALL_OPTION_VALUE);
    const [publisher, setPublisher] = useState<string>(ALL_OPTION_VALUE);
    const [developer, setDeveloper] = useState<string>(ALL_OPTION_VALUE);
    const [ allPublishers, setAllPublishers ] = useState<string[]>();
    const [ allDevelopers, setAllDevelopers ] = useState<string[]>();

    useEffect(() => {
        const fetchGames = async () => {
            const games = await getAllGames();
            setAllDevelopers(Array.from(new Set(addAllOption(sortFilterList(games.map(game => game.developer))))));
            setAllPublishers(Array.from(new Set(addAllOption(sortFilterList(games.map(game => game.publisher))))));
        }
        
        fetchGames();
    }, []);

    function sortFilterList(list: string[]) {
        list.sort();
        return list.filter((element: string) => element != null);
    }

    /**
     * Performs a search based on given title text and filters. The search is executed either
     * when the button is pressed or when the Enter key is pressed in the input field.
     */
    function onSearch(title: string) {
        search(title, category, publisher, developer);
    }

    return (
        <section id="searchForm">
            <h1 className={`searchForm__title ${rancho.className}`}>Search Games</h1>
            <article id="searchFilters">
                <Select 
                    title="Category" 
                    list={addAllOption(getCategories())} 
                    defaultOption={category} 
                    getOption={setCategory} 
                />

                { allPublishers ? <Select 
                    title="Publisher" 
                    list={allPublishers} 
                    defaultOption={publisher} 
                    getOption={setPublisher} 
                /> : <></> }

                { allDevelopers ? <Select 
                    title="Developer" 
                    list={allDevelopers} 
                    defaultOption={developer} 
                    getOption={setDeveloper} 
                /> : <></> }
            </article>

            <SearchInput onSearch={onSearch} />
        </section>
    );
}