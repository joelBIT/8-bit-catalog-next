import { useContext } from "react";
import { FavouritesContext, FavouritesContextProvider } from "../_contexts";

export function useFavourites(): FavouritesContextProvider {
    const context = useContext<FavouritesContextProvider>(FavouritesContext);

    if (!context) {
        throw new Error("useFavourites must be used within a FavouritesProvider");
    }

    return context;
}