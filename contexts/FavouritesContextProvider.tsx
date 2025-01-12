'use client';

import { createContext, ReactElement, useState } from "react";
import { FavouritesContextProvider, ContextProviderChildren } from "@/interfaces/interfaces";
import { Game } from "@/types/types";

export const FavouritesContext = createContext<FavouritesContextProvider>({} as FavouritesContextProvider);

export function FavouritesContexProvider({ children }: ContextProviderChildren): ReactElement {
    const [ favouritesList, setFavouritesList ] = useState<Game[]>([]);

    return (
        <FavouritesContext.Provider value={{ favouritesList, setFavouritesList }}>
            { children }
        </FavouritesContext.Provider>
    );
}