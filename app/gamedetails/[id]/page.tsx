'use client';

import { ReactElement, useEffect, useState } from "react";
import { GameDetailsCard } from "@/components/gamedetails/GameDetailsCard";
import { FieldSetFrame } from "@/components/common/FieldSetFrame";
import { Game } from "@/interfaces/interfaces";

import "./page.css";

export default function GameDetailsPage({ params }: { params: { id: string } }): ReactElement {
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
        <main id="gameDetailsPage">
            {game ? <FieldSetFrame legend="Game Details" body={<GameDetailsCard game={game}/>} /> : <></> }
        </main>
    );
}