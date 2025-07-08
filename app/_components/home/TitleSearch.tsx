'use client';

import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SuggestionList } from "@/app/_components/home/SuggestionList";
import { GameModal } from "@/app/_components/common";
import { getGameByTitle } from "@/app/_client/client";
import { Game } from "@/app/_types/types";

/**
 * Show titles of existing games in a list of suggestions matching the letters a user types. Opens a modal containing
 * information about the selected game when a user clicks on the view button.
 */
export function TitleSearch({ titles }: { titles: string[] }): ReactElement {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const showModal = params.get('show') ? true : false;
    const [ openModal, setOpenModal ] = useState<boolean>(showModal);
    const [ selectedGame, setSelectedGame ] = useState<Game>({} as Game);
    const [ message, setMessage ] = useState<string>("");

    useEffect(() => {
        setOpenModal(showModal);
    });

    async function click(title: string): Promise<void> {
        closeGameModal();       // Handles when back button on mobile phone is used, makes sure the url is really updated before opening modal

        if (!title) {
            setMessage("Please enter a title");
            return;
        }

        try {
            const game = await getGameByTitle(title);
            setSelectedGame(game);
            if (!game) {
                setMessage(`${title} does not exist`);
                return;
            }

            setTimeout(() => {
                params.set('show', "true");
                window.history.pushState(null, '', `?${params.toString()}`);
                setOpenModal(true);
            }, 200);
        } catch (error) {
            console.log(error);
        }
    }

    function closeGameModal(): void {
        params.delete('show');
        window.history.pushState(null, '', `?${params.toString()}`);
        setSelectedGame({} as Game);
        setOpenModal(false);
    }

    return (
        <>
            <SuggestionList options={titles} click={click} />

            { message.length > 0 ? <h2 className="message-failure"> {message} </h2> : <></> }

            { openModal && Object.keys(selectedGame).length > 0 ? <GameModal games={[selectedGame]} game={selectedGame} close={() => closeGameModal()} /> : <></> }
        </>
    )
}
