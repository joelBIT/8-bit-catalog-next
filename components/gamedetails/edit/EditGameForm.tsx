'use client';

import { ChangeEvent, ReactElement, useState } from "react";
import { useRouter } from 'next/navigation';
import { Game } from "@/interfaces/interfaces";
import { fileTypes, getCategories, getPlayersList } from "@/utils/utils";
import { arima } from "@/fonts/fonts";
import { updateGame } from "@/actions/actions";

import "./EditGameForm.css";

export function EditGameForm({ game }: { game: Game }): ReactElement {
    const router = useRouter();
    const [ title, setTitle ] = useState<string>(game.title);
    const [ file, setFile ] = useState<File>();
    const [ date, setDate ] = useState<string>(game.releaseDate);
    const [ year ] = useState<number>(game.releaseYear);
    const [ developer, setDeveloper ] = useState<string>(game.developer);
    const [ publisher, setPublisher ] = useState<string>(game.publisher);
    const [ description, setDescription ] = useState<string>(game.description);

    function handleFile(event: ChangeEvent<HTMLInputElement>): void {
        if (event.target.files) {
            setFile(event.target.files[0]);
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
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Game title" 
                autoComplete="false" 
                required 
            />

            <input 
                name="developer"
                type="text" 
                value={developer} 
                onChange={(e) => setDeveloper(e.target.value)} 
                placeholder="Developer" 
                autoComplete="false" 
                required 
            />

            <input 
                name="publisher"
                type="text" 
                value={publisher} 
                onChange={(e) => setPublisher(e.target.value)} 
                placeholder="Publisher" 
                autoComplete="false" 
                required 
            />

            <section className="selectSection categorySection">
                <h2 className={`selectSection__title ${arima.className}`}>Category</h2>
                <select name="category" className="selectSection__select" defaultValue={game.category}>
                    {getCategories().map((element, index) => <option key={index} value={element}>{element}</option>)}
                </select>
            </section>

            <textarea 
                id="description" 
                name="description"
                form="editGameForm"
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Description" 
                autoComplete="false" 
                required 
            />

            <section id="coverSection">
                <h2 className={`coverSection__title ${arima.className}`}>Cover</h2>
                <input name="cover" defaultValue={file?.name} type="file" accept={fileTypes.toString()} onChange={handleFile} required />
            </section>

            <section className="selectSection playersSection">
                <h2 className={`selectSection__title ${arima.className}`}>Players</h2>
                <select name="players" className="selectSection__select" defaultValue={game.players?.toString()}>
                    { getPlayersList().map((element, index) => <option key={index} value={element}>{element}</option>) }
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