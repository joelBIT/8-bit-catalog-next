'use client';

import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGames } from "@/app/_hooks";
import { SuggestionList } from "@/app/_components/home";
import { GameModal } from "@/app/_components/common";
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
    const { getGameByTitle } = useGames();

    useEffect(() => {
        setOpenModal(showModal);
    }, [showModal]);

    async function selectGame(title: string): Promise<void> {
        if (!title) {
            setMessage("Please enter a title");
            return;
        }

        const game = getGameByTitle(title);
        if (!game) {
            setMessage(`${title} is not a valid title`);
            return;
        }
        setSelectedGame(game);

        setTimeout(() => {
            params.set('show', "true");
            window.history.pushState(null, '', `?${params.toString()}`);
            setOpenModal(true);
            setMessage("");
        }, 200);
    }

    function closeGameModal(): void {
        params.delete('show');
        window.history.pushState(null, '', `?${params.toString()}`);
        setSelectedGame({} as Game);
        setOpenModal(false);
    }

    return (
        <>
            <SuggestionList options={titles} click={selectGame} />

            { message.length > 0 ? <h2 className="message-failure"> {message} </h2> : <></> }

            { openModal && Object.keys(selectedGame).length > 0 ? <GameModal games={[selectedGame]} game={selectedGame} close={() => closeGameModal()} /> : <></> }
        </>
    )
}
