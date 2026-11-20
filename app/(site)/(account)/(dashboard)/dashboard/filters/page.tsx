import { ReactElement } from "react";
import { EditFilterForm } from "@/app/_components/account/forms";
import { getAllCategories, getAllDevelopers, getAllPublishers } from "@/app/_db/games-db";
import { requireAdmin } from "@/app/_auth/server-functions";

import "./page.css";

/**
 * Edit game filters. Filters are used in search to find specific games.
 */
export default async function FiltersPage(): Promise<ReactElement> {
    await requireAdmin();
    const [categories, publishers, developers] = await Promise.all([
        getAllCategories(), getAllPublishers(), getAllDevelopers()
    ]);

    return (
        <main id="filtersPage">
            <h1 className="filters-title"> Filters </h1>

            <EditFilterForm 
                filterValues={categories} 
                title="Category" 
                filter="category"
            />

            <EditFilterForm 
                filterValues={publishers} 
                title="Publisher" 
                filter="publisher" 
            />

            <EditFilterForm 
                filterValues={developers} 
                title="Developer" 
                filter="developer" 
            />
        </main>
    );
}