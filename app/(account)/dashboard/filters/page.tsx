import { ReactElement } from "react";
import { getAllCategories, getAllDevelopers, getAllPublishers } from "@/db/db";
import { EditFilterForm } from "@/components/account/EditFilterForm";

import "./page.css";

/**
 * Since this is an admin page for updating filters all filter values are retrieved from the database directly (instead of e.g., context).
 * The updates are stored directly in the database.
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