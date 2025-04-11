'use client';

import { ReactElement, useContext } from "react";
import { FilterContext } from "@/contexts";
import { arima } from "@/fonts/fonts";
import { removeAllOption } from "@/utils/utils";

/**
 * Updates a game's category. Then it is possible to find the game by searching on the updated value (using the category search filter).
 */
export function EditGameCategory({ defaultValue }: { defaultValue: string }): ReactElement {
    const { categories } = useContext(FilterContext);

    return (
        <section className="selectSection categorySection">
            <h2 className={`selectSection__title ${arima.className}`}> Category </h2>
            <select name="category" className="selectSection__select" defaultValue={defaultValue}>
                { removeAllOption(categories)?.map((element, index) => <option key={index} value={element}> {element} </option>) }
            </select>
        </section>
    );
}