import { useContext } from "react";
import { CollectionContext, CollectionContextProvider } from "../_contexts";

export function useCollection(): CollectionContextProvider {
    const context = useContext<CollectionContextProvider>(CollectionContext);

    if (!context) {
        throw new Error("useCollection must be used within a CollectionProvider");
    }

    return context;
}