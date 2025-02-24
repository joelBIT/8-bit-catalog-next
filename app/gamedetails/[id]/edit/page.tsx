import { ReactElement } from "react";
import { FieldSetFrame } from "@/components/common/FieldSetFrame";
import { EditGameForm } from "@/components/gamedetails/edit/EditGameForm";
import { getGameById } from "@/db/db";

import "./page.css";

export default async function EditGamePage({ params }: { params: Promise<{ id: string }> }): Promise<ReactElement<ReactElement>> {
    const param = await params;
    const id = param.id;
    
    return (
        <main id="editGamePage">
            <FieldSetFrame legend={"Edit Details"} body={<EditGameForm game={ await getGameById(parseInt(id)) } />} />
        </main>
    );
}