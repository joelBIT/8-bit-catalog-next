'use client';

import { createContext, type ReactElement, type ReactNode, useEffect, useState } from "react";
import { FilterValues, SortOrder } from "../_types/types";
import { getFilters } from "../_client/client";

export interface OptionsContextProvider {
    sortOrder: SortOrder;
    filterValues: FilterValues;
    numberGamesShowing: number;
    setNumberGamesShowing: (max: number) => void;
    setSortOrder: (order: SortOrder) => void;
    gridView: boolean;
    toggleGridView: () => void;
}

export const OptionsContext = createContext<OptionsContextProvider>({} as OptionsContextProvider);

/**
 * Keeps state about options made by the user (list sorting, grid or list view, etc).
 */
export function OptionsProvider({ children }: { children: ReactNode }): ReactElement {
    const [numberGamesShowing, setNumberGamesShowing] = useState<number>(50);
    const [filterValues, setFilterValues] = useState<FilterValues>({developers: [], publishers: [], categories: []});
    const [sortOrder, setSortOrder] = useState<SortOrder>("titleAsc");
    const [gridView, setGridView] = useState<boolean>(true);              // The chosen list view for game lists

    useEffect(() => {
        getFilterValues();
    }, []);

    async function getFilterValues(): Promise<void> {
        const values = await getFilters();
        setFilterValues(values);
    }

    function toggleGridView(): void {
        setGridView(!gridView);
    }
    
    return (
        <OptionsContext.Provider value={{ gridView, filterValues, numberGamesShowing, sortOrder, setSortOrder, toggleGridView, setNumberGamesShowing }}>
            { children }
        </OptionsContext.Provider>
    );
}