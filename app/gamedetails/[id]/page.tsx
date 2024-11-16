import { ReactElement } from "react";
import { GameDetailsCard } from "@/components/gamedetails/GameDetailsCard";
import { FieldSetFrame } from "@/components/common/FieldSetFrame";

import "./page.css";

export default function GameDetailsPage({ params }: { params: { id: string } }): ReactElement {

    return (
        <main id="gameDetailsPage">
            <FieldSetFrame legend="Game Details" body={<GameDetailsCard id={parseInt(params.id)}/>} />
        </main>
    );
}