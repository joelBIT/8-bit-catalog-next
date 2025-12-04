import { useContext } from "react";
import { GameContext, GameContextProvider } from "../_contexts";

export function useGame(): GameContextProvider {
    const context = useContext<GameContextProvider>(GameContext);

    if (!context) {
        throw new Error("useGame must be used within a GameProvider");
    }

    return context;
}