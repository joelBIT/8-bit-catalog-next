import { ReactElement } from "react";
import { Select } from "../common/Select";
import { createFilterList } from "@/utils/utils";

export function CategoryFilter({ defaultOption, setCategory }: { defaultOption: string, setCategory: (category: string) => void }): ReactElement {
    return (
        <Select 
            title="Category" 
            list={createFilterList("category")} 
            defaultOption={defaultOption} 
            getOption={setCategory} 
        />
    );
}