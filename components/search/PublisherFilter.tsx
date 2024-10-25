import { ReactElement } from "react";
import { Select } from "../common/Select";
import { createFilterList } from "@/utils/utils";

export function PublisherFilter({ defaultOption, setPublisher }: { defaultOption: string, setPublisher: (publisher: string) => void }): ReactElement {
    return (
        <Select 
            title="Publisher" 
            list={createFilterList("publisher")} 
            defaultOption={defaultOption} 
            getOption={setPublisher} 
        />
    );
}