import { ReactElement } from "react";
import { EditGameForm } from "@/components/gamedetails/edit/EditGameForm";
import { getGameById } from "@/db/db";

import "./page.css";

export default async function EditGamePage({ params }: { params: Promise<{ id: string }> }): Promise<ReactElement> {
    const param = await params;
    const id = parseInt(param.id);
    
    return (
        <main id="editGamePage">
            <EditGameForm game={await getGameById(id)} />
        </main>
    );
}