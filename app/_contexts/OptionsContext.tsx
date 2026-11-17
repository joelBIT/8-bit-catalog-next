'use client';

import { createContext, type ReactElement, type ReactNode, useState } from "react";
import { SortOrder } from "../_types/types";
import { TITLE_ASC } from "../_utils/utils";

export interface OptionsContextProvider {
    sortOrder: SortOrder;
    numberGamesShowing: number;
    setNumberGamesShowing: (max: number) => void;
    setSortOrder: (order: SortOrder) => void;
    gridView: boolean;
    toggleGridView: () => void;
}

export const OptionsContext = createContext<OptionsContextProvider | undefined>(undefined);

/**
 * Keeps state about options made by the user (list sorting, grid or list view, etc).
 */
export function OptionsProvider({ children }: { children: ReactNode }): ReactElement {
    const [numberGamesShowing, setNumberGamesShowing] = useState<number>(50);
    const [sortOrder, setSortOrder] = useState<SortOrder>(TITLE_ASC);
    const [gridView, setGridView] = useState<boolean>(true);              // The chosen list view for game lists

    function toggleGridView(): void {
        setGridView(previous => !previous);
    }
    
    return (
        <OptionsContext.Provider value={{ gridView, numberGamesShowing, sortOrder, setSortOrder, toggleGridView, setNumberGamesShowing }}>
            { children }
        </OptionsContext.Provider>
    );
}