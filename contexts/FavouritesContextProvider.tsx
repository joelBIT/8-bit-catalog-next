'use client';

import { FavouritesContextProvider, ContextProviderChildren, Game } from "@/interfaces/interfaces";
import { createContext, ReactElement, useState } from "react";

export const FavouritesContext = createContext<FavouritesContextProvider>({} as FavouritesContextProvider);

export function FavouritesContexProvider({ children }: ContextProviderChildren): ReactElement {
    const [ favouritesList, setFavouritesList ] = useState<Game[]>([]);

    return (
        <FavouritesContext.Provider value={{ favouritesList, setFavouritesList }}>
            { children }
        </FavouritesContext.Provider>
    );
}