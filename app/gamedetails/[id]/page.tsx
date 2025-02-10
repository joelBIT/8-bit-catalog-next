import { ReactElement } from "react";
import { GameDetailsCard } from "@/components/gamedetails/GameDetailsCard";
import { FieldSetFrame } from "@/components/common/FieldSetFrame";
import { getGameById } from "@/db/db";

import "./page.css";

export default async function GameDetailsPage({ params }: { params: Promise<{ id: string }> }): Promise<ReactElement<ReactElement>> {
    const param = await params;
    const id = param.id;

    return (
        <main id="gameDetailsPage">
            <FieldSetFrame legend="Game Details" body={<GameDetailsCard game={ await getGameById(parseInt(id)) }/>} />
        </main>
    );
}