import { ReactElement } from "react";
import { getAllCategories, getAllDevelopers, getAllPublishers } from "@/db/db";
import { EditFilterForm } from "@/components/account/EditFilterForm";

import "./page.css";

export default async function FiltersPage(): Promise<ReactElement> {
    return (
        <main id="filtersPage">
            <EditFilterForm 
                categories={await getAllCategories()} 
                developers={await getAllDevelopers()}
                publishers={await getAllPublishers()}
            />
        </main>
    );
}