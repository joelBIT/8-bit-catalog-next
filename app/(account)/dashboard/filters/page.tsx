import { ReactElement } from "react";
import { getAllCategories } from "@/db/db";

import "./page.css";

export default async function FiltersPage(): Promise<ReactElement> {
    return (
        <main id="filtersPage">
            { await getAllCategories() }
        </main>
    );
}