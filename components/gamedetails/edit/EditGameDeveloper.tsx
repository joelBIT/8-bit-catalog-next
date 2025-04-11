'use client';

import { ReactElement, useContext } from "react";
import { FilterContext } from "@/contexts";
import { removeAllOption } from "@/utils/utils";

/**
 * Updates a game's developer. Then it is possible to find the game by searching on the updated value (using the developer search filter).
 */
export function EditGameDeveloper({ defaultValue }: { defaultValue: string }): ReactElement {
    const { developers } = useContext(FilterContext);
    
    return (
        <fieldset className="filter-fieldset">
            <legend> Developer </legend>
            <select name="developer" className="selectSection__select" defaultValue={defaultValue}>
                { removeAllOption(developers)?.map(element => <option key={element} value={element}> {element} </option>) }
            </select>
        </fieldset>
    );
}