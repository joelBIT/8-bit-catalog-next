'use client';

import { FieldSetFrame } from "@/components/common/FieldSetFrame";
import { GameDetailsCard } from "@/components/gamedetails/GameDetailsCard";
import { getGame } from "@/data/game";
import { ReactElement } from "react";
import styles from "./gameDetails.module.css";

export default function GameDetailsPage({ params }: { params: { id: string } }): ReactElement {

    return (
        <main id={styles.gameDetailsPage}>
            <FieldSetFrame legend="Game Details" body={<GameDetailsCard game={getGame(parseInt(params.id))}/>} />
        </main>
    );
}