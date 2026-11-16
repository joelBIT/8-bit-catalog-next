import { Context, useContext } from "react";

export function useRequiredContext<T>(context: Context<T | undefined>, name: string, provider: string): T {
    const value = useContext(context);
    if (value === undefined) {
        throw new Error(`${name} must be used within a ${provider}`);
    }
    return value;
}