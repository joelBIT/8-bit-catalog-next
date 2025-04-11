'use client';

import { ReactElement, useContext } from "react";
import { FilterContext } from "@/contexts";
import { removeAllOption } from "@/utils/utils";

/**
 * Updates a game's publisher. Then it is possible to find the game by searching on the updated value (using the publisher search filter).
 */
export function EditGamePublisher({ defaultValue }: { defaultValue: string }): ReactElement {
    const { publishers } = useContext(FilterContext);
    
    return (
        <fieldset className="filter-fieldset">
            <legend> Publisher </legend>
            <select name="publisher" className="selectSection__select" defaultValue={defaultValue}>
                { removeAllOption(publishers)?.map(element => <option key={element} value={element}> {element} </option>) }
            </select>
        </fieldset>
    );
}