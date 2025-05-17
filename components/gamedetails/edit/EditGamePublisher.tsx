import { ReactElement } from "react";

import "./EditGamePublisher.css";

/**
 * Edit a game's publisher. Then it is possible to find the game by searching on the updated value (using the publisher search filter).
 */
export function EditGamePublisher({ publishers, defaultValue }: { publishers: string[], defaultValue: string }): ReactElement {
    return (
        <fieldset id="editfilter-publisher">
            <legend> Publisher </legend>
            <select name="publisher" className="selectSection__select" defaultValue={defaultValue}>
                { publishers.map(element => <option key={element} value={element}> {element} </option>) }
            </select>
        </fieldset>
    );
}