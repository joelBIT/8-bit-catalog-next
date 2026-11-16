import { GamesContext } from "../_contexts";
import { useRequiredContext } from "./useRequiredContext";

export const useGames = () => useRequiredContext(GamesContext, "useGames", "GamesProvider");