import { CollectionContext } from "../_contexts";
import { useRequiredContext } from ".";

export const useCollection = () => useRequiredContext(CollectionContext, "useCollection", "CollectionProvider");