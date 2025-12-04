import { useContext } from "react";
import { GamesContext, GamesContextProvider } from "../_contexts/GamesContext";

export function useGames(): GamesContextProvider {
    const context = useContext<GamesContextProvider>(GamesContext);

    if (!context) {
        throw new Error("useGames must be used within a GamesProvider");
    }

    return context;
}