'use server';

import { ReactElement } from "react";
import { getAllPublishers } from "@/db/db";

import "./EditGamePublisher.css";

/**
 * Edit a game's publisher. Then it is possible to find the game by searching on the updated value (using the publisher search filter).
 */
export async function EditGamePublisher({ defaultValue }: { defaultValue: string }): Promise<ReactElement> {
    return (
        <fieldset id="editfilter-publisher">
            <legend> Publisher </legend>
            <select name="publisher" className="selectSection__select" defaultValue={defaultValue}>
                { (await getAllPublishers()).map(element => <option key={element} value={element}> {element} </option>) }
            </select>
        </fieldset>
    );
}