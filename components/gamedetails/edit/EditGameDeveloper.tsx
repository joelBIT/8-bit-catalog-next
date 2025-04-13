'use server';

import { ReactElement } from "react";
import { getAllDevelopers } from "@/db/db";

/**
 * Edit a game's developer. Then it is possible to find the game by searching on the updated value (using the developer search filter).
 */
export async function EditGameDeveloper({ defaultValue }: { defaultValue: string }): Promise<ReactElement> {    
    return (
        <fieldset className="filter-fieldset">
            <legend> Developer </legend>
            <select name="developer" className="selectSection__select" defaultValue={defaultValue}>
                { (await getAllDevelopers()).map(element => <option key={element} value={element}> {element} </option>) }
            </select>
        </fieldset>
    );
}