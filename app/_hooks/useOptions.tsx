import { OptionsContext } from "../_contexts";
import { useRequiredContext } from "./useRequiredContext";

export const useOptions = () => useRequiredContext(OptionsContext, "useOptions", "OptionsProvider");