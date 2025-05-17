import { ReactElement } from "react";

import "./EditGameDeveloper.css";

/**
 * Edit a game's developer. Then it is possible to find the game by searching on the updated value (using the developer search filter).
 */
export function EditGameDeveloper({ developers, defaultValue }: { developers: string[], defaultValue: string }): ReactElement {    
    return (
        <fieldset id="editfilter-developer">
            <legend> Developer </legend>
            <select name="developer" className="selectSection__select" defaultValue={defaultValue}>
                { developers.map(element => <option key={element} value={element}> {element} </option>) }
            </select>
        </fieldset>
    );
}