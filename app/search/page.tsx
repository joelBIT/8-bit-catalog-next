import { ReactElement } from "react";
import { SearchFilters } from "@/components/search/SearchFilters";
import { getAllDevelopers, getAllPublishers } from "@/db/db";
import { addAllOption } from "@/utils/utils";

import "./page.css";

export default async function SearchPage(): Promise<ReactElement> {

    return (
        <main id="searchPage">
            <SearchFilters developers={addAllOption(await getAllDevelopers())} publishers={addAllOption(await getAllPublishers())} />
        </main>
    );
}