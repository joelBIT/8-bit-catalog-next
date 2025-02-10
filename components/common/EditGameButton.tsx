'use client';

import { ReactElement } from "react";
import { useRouter } from 'next/navigation';

export function EditGameButton( { gameId } : { gameId: number}): ReactElement<ReactElement> {
    const router = useRouter();

    function editGame() {
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