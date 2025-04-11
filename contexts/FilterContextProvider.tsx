'use client';

import { createContext, ReactElement, useEffect, useState } from "react";
import { ContextProviderChildren, FilterContextProvider } from "@/interfaces/interfaces";
import { getAllCategories, getAllDevelopers, getAllPublishers } from "@/db/db";

export const FilterContext = createContext<FilterContextProvider>({} as FilterContextProvider);

/**
 * This is the context for filters used in the application. Filter values will almost never change.
 */
export function FilterContexProvider({ children }: ContextProviderChildren): ReactElement {
    const [ categories, setCategories ] = useState<string[]>([]);
    const [ publishers, setPublishers ] = useState<string[]>([]);
    const [ developers, setDevelopers ] = useState<string[]>([]);

    useEffect(() => {
        addCategories();
        addPublishers();
        addDevelopers();
    }, []);

    async function addCategories(): Promise<void> {
        setCategories(await getAllCategories());
    }

    async function addPublishers(): Promise<void> {
        setPublishers(await getAllPublishers());
    }

    async function addDevelopers(): Promise<void> {
        setDevelopers(await getAllDevelopers());
    }

    return (
        <FilterContext.Provider value={{ categories, developers, publishers }}>
            { children }
        </FilterContext.Provider>
    );
}