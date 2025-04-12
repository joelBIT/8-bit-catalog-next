'use client';

import { ChangeEvent, ReactElement, useState } from "react";
import { useRouter } from 'next/navigation';
import { Game } from "@/types/types";
import { fileTypes, getPlayersList, URL_GAME_DETAILS_PAGE } from "@/utils/utils";
import { arima } from "@/fonts/fonts";
import { updateGame } from "@/actions/games";
import { EditGameCategory, EditGameDeveloper, EditGamePublisher } from ".";

import "./EditGameForm.css";

/**
 * Edit the metadata for a game.
 */
export function EditGameForm({ game }: { game: Game }): ReactElement {
    const router = useRouter();
    const [ cover, setCover ] = useState<File>();
    const [ date, setDate ] = useState<string>(game.release_date);

    function handleCover(event: ChangeEvent<HTMLInputElement>): void {
        if (event.target.files) {
            setCover(event.target.files[0]);
        }
    }

    const updateGameWithId = updateGame.bind(null, game.id);
    
    return (
        <form id="editGameForm" action={updateGameWithId}>
            <input
                name="title"
                type="text" 
                defaultValue={game.title}
                placeholder="Game title" 
                autoComplete="false" 
                required 
            />

            <EditGameDeveloper defaultValue={game.developer} />
            <EditGamePublisher defaultValue={game.publisher}/>
            <EditGameCategory defaultValue={game.category} />

            <section className="selectSection romSection">
                <h2 className={`romSection__title ${arima.className}`}> Has ROM? </h2>
                <select name="rom" id="rom-select" defaultValue={game.rom.toString()}>
                    <option value="false"> No </option>
                    <option value="true"> Yes </option>
                </select>
            </section>

            <textarea 
                id="description" 
                name="description"
                form="editGameForm"
                defaultValue={game.description}
                placeholder="Description" 
                autoComplete="false" 
                required 
            />

            <section id="coverSection">
                <h2 className={`coverSection__title ${arima.className}`}> New Cover </h2>
                <input name="cover" type="file" defaultValue={cover?.name} accept={fileTypes.toString()} onChange={handleCover} />
            </section>

            <section className="selectSection playersSection">
                <h2 className={`selectSection__title ${arima.className}`}> Players </h2>
                <select name="players" className="selectSection__select" defaultValue={game.players?.toString()}>
                    { getPlayersList().map((element, index) => <option key={index} value={element}> {element} </option>) }
                </select>
            </section>

            <section id="releasedSection">
                <h2 className={`releasedSection__title ${arima.className}`}> Released </h2>
                <input id="releaseDate" name="released" type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
            </section>

            <div className="editGameForm-buttons">
                <button 
                    id="cancelButton" 
                    className="gameButton" 
                    type="reset" 
                    onClick={() => router.push(`${URL_GAME_DETAILS_PAGE}/${game.id}`)}
                > 
                    Cancel 
                </button>

                <button id="saveButton" className="gameButton" type="submit"> Save </button>
            </div>
        </form>
    );
}