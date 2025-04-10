import { ReactElement } from "react";
import { getAllCategories, getAllDevelopers, getAllPublishers } from "@/db/db";
import { EditFilterForm } from "@/components/account/EditFilterForm";

import "./page.css";

export default async function FiltersPage(): Promise<ReactElement> {
    return (
        <main id="filtersPage">
            <EditFilterForm filterValues={await getAllCategories()} title="Category" />
            <EditFilterForm filterValues={await getAllPublishers()} title="Publisher" />
            <EditFilterForm filterValues={await getAllDevelopers()} title="Developer" />
        </main>
    );
}