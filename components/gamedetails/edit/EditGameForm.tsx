import { ChangeEvent, FormEvent, ReactElement, useState, useRef } from "react";
import { Game } from "@/interfaces/interfaces";
import { ALL_OPTION_VALUE, createParagraphs, createSelectList, fileTypes, getPlayersList, joinParagraphs } from "@/utils/utils";
import { arima } from "@/fonts/fonts";

import "./EditGameForm.css";

export function EditGameForm({ game }: { game: Game }): ReactElement {
    const [ players, setPlayers ] = useState<number>(game.players);
    const [ category, setCategory ] = useState<string>(game.category);
    const [ title, setTitle ] = useState<string>(game.title);
    const [ file, setFile ] = useState<File>();
    const [ date, setDate ] = useState<string>(game.releaseDate);
    const [ year ] = useState<number>(game.releaseYear);
    const [ developer, setDeveloper ] = useState<string>(game.developer);
    const [ publisher, setPublisher ] = useState<string>(game.publisher);
    const [ description, setDescription ] = useState<string>(joinParagraphs(game.description));
    const categoryRef = useRef<HTMLSelectElement>(null);
    const playersRef = useRef<HTMLSelectElement>(null);

    /**
     * Updates all Game properties and store the updated game in the list of all games. Then a
     * user is redirected to the details page of the updated game.
     */
    function saveChanges(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        game.title = title;
        game.category = category;
        game.players = players;
        game.description = createParagraphs(description);
        game.developer = developer;
        game.publisher = publisher;
        game.releaseDate = date;

        //updateGame(game);
    }

    function handleFile(event: ChangeEvent<HTMLInputElement>): void {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    }

    function handleCategory() {
        setCategory(categoryRef.current ? categoryRef.current.value : ALL_OPTION_VALUE);
    }

    function handlePlayers(): void {
        setPlayers(playersRef.current ? parseInt(playersRef.current.value) : 1);
    }

    function getDate(): string {
        return date ? date : `${year}-01-01`;
    }

    function handleDate(event: ChangeEvent<HTMLInputElement>): void {
        setDate(event.target.value);
    }
    
    return (
        <form id="editGameForm" onSubmit={saveChanges}>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Game title" 
                autoComplete="false" 
                required 
            />

            <input 
                type="text" 
                value={developer} 
                onChange={(e) => setDeveloper(e.target.value)} 
                placeholder="Developer" 
                autoComplete="false" 
                required 
            />

            <input 
                type="text" 
                value={publisher} 
                onChange={(e) => setPublisher(e.target.value)} 
                placeholder="Publisher" 
                autoComplete="false" 
                required 
            />

            <section className="selectSection categorySection">
                <h2 className={`selectSection__title ${arima.className}`}>Category</h2>
                <select
                    className="selectSection__select"
                    defaultValue={category} 
                    ref={categoryRef} 
                    onChange={handleCategory}
                >

                    {createSelectList("category").map((element, index) => <option key={index} value={element}>{element}</option>)}
                </select>
            </section>

            <textarea 
                id="description" 
                form="editGameForm"
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Description" 
                autoComplete="false" 
                required 
            />

            <section id="coverSection">
                <h2 className={`coverSection__title ${arima.className}`}>Cover</h2>
                <input type="file" accept={fileTypes.toString()} onChange={handleFile} required />
            </section>

            <section className="selectSection playersSection">
                <h2 className={`selectSection__title ${arima.className}`}>Players</h2>
                <select
                    className="selectSection__select"
                    defaultValue={players.toString()} 
                    ref={playersRef} 
                    onChange={handlePlayers}
                >

                    { getPlayersList().map((element, index) => <option key={index} value={element}>{element}</option>) }
                </select>
            </section>

            <section id="releasedSection">
                <h2 className={`releasedSection__title ${arima.className}`}>Released</h2>
                <input id="releaseDate" type="date" value={getDate()} onChange={handleDate} required />
            </section>

            <div>
                <button 
                    id="cancelButton" 
                    className="gameButton" 
                    type="button" 
                >
                        Cancel
                </button>
                
                <button id="saveButton" className="gameButton" type="submit"> Save </button>
            </div>
        </form>
    );
}