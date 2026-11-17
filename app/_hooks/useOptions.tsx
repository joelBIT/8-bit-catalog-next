import { OptionsContext } from "../_contexts";
import { useRequiredContext } from ".";

export const useOptions = () => useRequiredContext(OptionsContext, "useOptions", "OptionsProvider");