import { ReactElement } from "react";
import { Select } from "./Select";
import { createSelectList } from "@/utils/utils";

export function SelectCategory({ defaultOption, setCategory }: { defaultOption: string, setCategory: (category: string) => void }): ReactElement {
    return (
        <Select 
            title="Category" 
            list={createSelectList("category")} 
            defaultOption={defaultOption} 
            getOption={setCategory} 
        />
    );
}