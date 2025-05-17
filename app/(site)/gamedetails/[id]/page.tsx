import { ReactElement } from "react";
import { GameDetailsCard } from "@/app/_components/gamedetails/GameDetailsCard";
import { getGameById } from "@/app/_db/db";

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