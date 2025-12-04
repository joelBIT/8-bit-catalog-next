import { ReactElement } from "react";
import { getAllCategories, getAllDevelopers, getAllPublishers } from "@/app/_db/db";
import { EditFilterForm } from "@/app/_components/account/EditFilterForm";

import "./page.css";

/**
 * Edit game filters. Filters are used in search to find desired games.
 */
export default async function FiltersPage(): Promise<ReactElement> {
    return (
        <main id="filtersPage">
            <EditFilterForm 
                filterValues={await getAllCategories()} 
                title="Category" 
                filter="categories"
            />

            <EditFilterForm 
                filterValues={await getAllPublishers()} 
                title="Publisher" 
                filter="publishers" 
            />

            <EditFilterForm 
                filterValues={await getAllDevelopers()} 
                title="Developer" 
                filter="developers" 
            />
        </main>
    );
}