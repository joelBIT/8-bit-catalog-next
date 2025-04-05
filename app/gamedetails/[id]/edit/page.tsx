import { ReactElement } from "react";
import { EditGameForm } from "@/components/gamedetails/edit/EditGameForm";
import { FieldSetFrame } from "@/components/common";
import { getGameById } from "@/db/db";

import "./page.css";

export default async function EditGamePage({ params }: { params: Promise<{ id: string }> }): Promise<ReactElement<ReactElement>> {
    const param = await params;
    const id = parseInt(param.id);
    
    return (
        <main id="editGamePage">
            <FieldSetFrame legend="Edit Details" body={<EditGameForm game={ await getGameById(id) } />} />
        </main>
    );
}