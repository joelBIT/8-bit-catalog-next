import { ReactElement } from "react";
import { GameDetailsCard } from "@/components/gamedetails/GameDetailsCard";
import { getGameById } from "@/db/db";

import "./page.css";

export default async function GameDetailsPage({ params }: { params: Promise<{ id: string }> }): Promise<ReactElement> {
    const param = await params;
    const id = parseInt(param.id);

    return (
        <main id="gameDetailsPage">
            <GameDetailsCard game={ await getGameById(id) }/>
        </main>
    );
}