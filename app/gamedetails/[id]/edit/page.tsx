'use client';

import { ReactElement, useEffect, useState } from "react";
import { FieldSetFrame } from "@/components/common/FieldSetFrame";
import { EditGameForm } from "@/components/gamedetails/edit/EditGameForm";
import { Game } from "@/interfaces/interfaces";

import "./page.css";

export default function EditGamePage({ params }: { params: { id: string }}): ReactElement {
    const [ game, setGame ] = useState<Game>();

    useEffect(() => {
        const fetchGame = async () => {
            const response = await fetch(`/api/game?id=${params.id}`);
            const data = await response.json();
            setGame(data);
        }

        fetchGame();
    }, []);
    
    return (
        <main id="editGamePage">
            { game ? <FieldSetFrame legend={"Edit Details"} body={<EditGameForm game={game} />} /> : <></> }
        </main>
    );
}