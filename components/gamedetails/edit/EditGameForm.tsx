import { ReactElement } from "react";
import { Game } from "@/types/types";
import { fileTypes, getPlayersList, URL_GAME_DETAILS_PAGE } from "@/utils/utils";
import { arima } from "@/fonts/fonts";
import { updateGame } from "@/actions/games";
import { EditGameCategory, EditGameDeveloper, EditGamePublisher } from ".";
import { CancelButton } from "@/components/common";

import "./EditGameForm.css";

/**
 * Edit the metadata for a game.
 */
export function EditGameForm({ game }: { game: Game }): ReactElement {
    const updateGameWithId = updateGame.bind(null, game.id);
    
    return (
        <form id="editGameForm" action={updateGameWithId}>
            <section id="editGameForm-metadata">
                <article id="editGameForm-filters">
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
                </article>

                <article id="editGameForm-nonfilters">
                    <section id="coverSection">
                        <h2 className={`coverSection__title ${arima.className}`}> New Cover </h2>
                        <input name="cover" type="file" accept={fileTypes.toString()} />
                    </section>

                    <section className="selectSection playersSection">
                        <h2 className={`selectSection__title ${arima.className}`}> Players </h2>
                        <select name="players" className="selectSection__select" defaultValue={game.players?.toString()}>
                            { getPlayersList().map((element, index) => <option key={index} value={element}> {element} </option>) }
                        </select>
                    </section>

                    <section id="releasedSection">
                        <h2 className={`releasedSection__title ${arima.className}`}> Released </h2>
                        <input id="releaseDate" name="released" type="date" defaultValue={game.release_date} required />
                    </section>

                    <section className="selectSection romSection">
                        <h2 className={`romSection__title ${arima.className}`}> Has ROM? </h2>
                        <input id="rom-select" type="checkbox" name="rom" defaultChecked={game.rom} />
                    </section>
                </article>
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

            <div className="editGameForm-buttons">
                <CancelButton url={`${URL_GAME_DETAILS_PAGE}/${game.id}`} />
                <button id="saveButton" className="gameButton" type="submit"> Save </button>
            </div>
        </form>
    );
}