import { useContext } from "react";
import { OptionsContext, OptionsContextProvider } from "../_contexts";

export function useOptions(): OptionsContextProvider {
    const context = useContext<OptionsContextProvider>(OptionsContext);

    if (!context) {
        throw new Error("useOptions must be used within a OptionsProvider");
    }

    return context;
}