import { FieldSetFrame } from "@/components/common/FieldSetFrame";
import { ReactElement } from "react";
import styles from "./gameDetails.module.css";
import { GameDetailsCard } from "@/components/gamedetails/GameDetailsCard";

export default function GameDetailsPage({ params }: { params: { id: string } }): ReactElement {

    return (
        <main id={styles.gameDetailsPage}>
            <FieldSetFrame legend="Game Details" body={<GameDetailsCard id={parseInt(params.id)}/>} />
        </main>
    );
}