import { ReactElement } from "react";
import { FieldSetFrame } from "@/components/common/FieldSetFrame";
import { EditGameForm } from "@/components/gamedetails/edit/EditGameForm";
import { getGameById } from "@/db/db";

import "./page.css";

export default async function EditGamePage({ params }: { params: { id: string }}): Promise<ReactElement> {
    
    return (
        <main id="editGamePage">
            <FieldSetFrame legend={"Edit Details"} body={<EditGameForm game={ await getGameById(parseInt(params.id)) } />} />
        </main>
    );
}