import { CollectionContext } from "../_contexts";
import { useRequiredContext } from "./useRequiredContext";

export const useCollection = () => useRequiredContext(CollectionContext, "useCollection", "CollectionProvider");