import { GamesContext } from "../_contexts";
import { useRequiredContext } from ".";

export const useGames = () => useRequiredContext(GamesContext, "useGames", "GamesProvider");