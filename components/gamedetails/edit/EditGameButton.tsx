'use client';

import { ReactElement } from "react";
import { useRouter } from 'next/navigation';

import "./EditGameButton.css";

export function EditGameButton( { gameId } : { gameId: number}): ReactElement {
    const router = useRouter();

    function editGame(): void {
        router.push(`/gamedetails/${gameId}/edit`);
    }

    return (
        <button 
            id="editButton" 
            className="gameButton"
            onClick={() => editGame()}>
                Edit
        </button>
    );
}