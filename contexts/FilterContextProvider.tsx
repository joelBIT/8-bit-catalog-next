'use client';

import { createContext, ReactElement, useEffect, useState } from "react";
import { ContextProviderChildren, FilterContextProvider } from "@/interfaces/interfaces";

export const FilterContext = createContext<FilterContextProvider>({} as FilterContextProvider);

/**
 * This is the context for filters used in the application.
 */
export function FilterContexProvider({ children }: ContextProviderChildren): ReactElement {
    const [ categories, setCategories ] = useState<string[]>([]);
    const [ publishers, setPublishers ] = useState<string[]>([]);
    const [ developers, setDevelopers ] = useState<string[]>([]);

    useEffect(() => {
        
    }, []);

    return (
        <FilterContext.Provider value={{ categories, developers, publishers }}>
            { children }
        </FilterContext.Provider>
    );
}