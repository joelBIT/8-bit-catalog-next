'use client';

import { ChangeEvent, ReactElement, useState } from "react";
import { useRouter } from 'next/navigation';
import { Game } from "@/interfaces/interfaces";
import { fileTypes, getCategories, getPlayersList } from "@/utils/utils";
import { arima } from "@/fonts/fonts";
import { updateGame } from "@/actions/games";

import "./EditGameForm.css";

export function EditGameForm({ game }: { game: Game }): ReactElement {
    const router = useRouter();
    const [ cover, setCover ] = useState<File>();
    const [ date, setDate ] = useState<string>(game.releaseDate);
    const [ year ] = useState<number>(game.releaseYear);

    function handleCover(event: ChangeEvent<HTMLInputElement>): void {
        if (event.target.files) {
            setCover(event.target.files[0]);
        }
    }

    function getDate(): string {
        return date ? date : `${year}-01-01`;
    }

    function handleDate(event: ChangeEvent<HTMLInputElement>): void {
        setDate(event.target.value);
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

            <input 
                name="developer"
                type="text" 
                defaultValue={game.developer}
                placeholder="Developer" 
                autoComplete="false" 
                required 
            />

            <input 
                name="publisher"
                type="text" 
                defaultValue={game.publisher}
                placeholder="Publisher" 
                autoComplete="false" 
                required 
            />

            <section className="selectSection categorySection">
                <h2 className={`selectSection__title ${arima.className}`}>Category</h2>
                <select name="category" className="selectSection__select" defaultValue={game.category}>
                    {getCategories().map((element, index) => <option key={index} value={element}> {element} </option>)}
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
                <h2 className={`coverSection__title ${arima.className}`}>Cover</h2>
                <input name="cover" type="file" accept={fileTypes.toString()} onChange={handleCover} required />
            </section>

            <section className="selectSection playersSection">
                <h2 className={`selectSection__title ${arima.className}`}>Players</h2>
                <select name="players" className="selectSection__select" defaultValue={game.players?.toString()}>
                    { getPlayersList().map((element, index) => <option key={index} value={element}> {element} </option>) }
                </select>
            </section>

            <section id="releasedSection">
                <h2 className={`releasedSection__title ${arima.className}`}>Released</h2>
                <input id="releaseDate" name="released" type="date" value={getDate()} onChange={handleDate} required />
            </section>

            <div className="editGameForm-buttons">
                <button id="cancelButton" className="gameButton" type="reset" onClick={() => router.push(`/gamedetails/${game.id}`)}> Cancel</button>
                <button id="saveButton" className="gameButton" type="submit"> Save </button>
            </div>
        </form>
    );
}