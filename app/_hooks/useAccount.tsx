import { useContext } from "react";
import { AccountContext, AccountContextProvider } from "../_contexts";

export function useAccount(): AccountContextProvider {
    const context = useContext<AccountContextProvider>(AccountContext);

    if (!context) {
        throw new Error("useAccount must be used within a AccountProvider");
    }

    return context;
}