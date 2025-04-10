'use client';

import { createContext, ReactElement, useEffect, useState } from "react";
import { ContextProviderChildren, FilterContextProvider } from "@/interfaces/interfaces";
import { getAllCategories, getAllDevelopers, getAllPublishers } from "@/db/db";
import { addAllOption } from "@/utils/utils";

export const FilterContext = createContext<FilterContextProvider>({} as FilterContextProvider);

/**
 * This is the context for filters used in the application. The search filter version of the filters contain the 'All' value
 * since it is possible to search on all filter values at the same time. The regular filter version is used, for example, when
 * choosing a specific developer or category for a certain game.
 */
export function FilterContexProvider({ children }: ContextProviderChildren): ReactElement {
    const [ categories, setCategories ] = useState<string[]>([]);
    const [ searchCategories, setSearchCategories ] = useState<string[]>([]);
    const [ publishers, setPublishers ] = useState<string[]>([]);
    const [ searchPublishers, setSearchPublishers ] = useState<string[]>([]);
    const [ developers, setDevelopers ] = useState<string[]>([]);
    const [ searchDevelopers, setSearchDevelopers ] = useState<string[]>([]);

    useEffect(() => {
        addCategories();
        addPublishers();
        addDevelopers();
    }, []);

    async function addCategories(): Promise<void> {
        const allCategories = await getAllCategories();
        setCategories(allCategories);
        setSearchCategories(addAllOption(allCategories));
    }

    async function addPublishers(): Promise<void> {
        const allPublishers = await getAllPublishers();
        setPublishers(allPublishers);
        setSearchPublishers(addAllOption(allPublishers));
    }

    async function addDevelopers(): Promise<void> {
        const allDevelopers = await getAllDevelopers();
        setDevelopers(allDevelopers);
        setSearchDevelopers(addAllOption(allDevelopers));
    }

    return (
        <FilterContext.Provider value={{ categories, developers, publishers, searchCategories, searchPublishers, searchDevelopers }}>
            { children }
        </FilterContext.Provider>
    );
}