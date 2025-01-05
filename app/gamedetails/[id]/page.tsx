import { ReactElement } from "react";
import { GameDetailsCard } from "@/components/gamedetails/GameDetailsCard";
import { FieldSetFrame } from "@/components/common/FieldSetFrame";
import { getGameById } from "@/db/db";

import "./page.css";

export default async function GameDetailsPage({ params }: { params: { id: string } }): Promise<ReactElement> {

    return (
        <main id="gameDetailsPage">
            <FieldSetFrame legend="Game Details" body={<GameDetailsCard game={ await getGameById(parseInt(params.id)) }/>} />
        </main>
    );
}