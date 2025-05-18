import { ReactElement } from "react";
import { EditGameForm } from "@/app/_components/gamedetails/edit/EditGameForm";
import { getFilterValues, getGameById } from "@/app/_db/db";

import "./page.css";

export default async function EditGamePage({ params }: { params: Promise<{ id: string }> }): Promise<ReactElement> {
    const param = await params;
    const id = parseInt(param.id);
    
    return (
        <main id="editGamePage">
            <EditGameForm game={await getGameById(id)} filterValues={await getFilterValues()} />
        </main>
    );
}