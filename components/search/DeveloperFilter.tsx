'use client';

import { ReactElement, useContext } from "react";
import { FilterContext } from "@/contexts";
import { arima } from "@/fonts/fonts";
import { addAllOption } from "@/utils/utils";

/**
 * Since this filter is used for searching games it contains the 'All' option to search for games by all developers.
 */
export function DeveloperFilter({ defaultValue } : { defaultValue: string }): ReactElement {
    const { developers } = useContext(FilterContext);

    return (
        <section className="selectSection">
            <h2 className={`selectSection__title ${arima.className}`}> Developer </h2>

            <select className="selectSection__select" name="developer" defaultValue={defaultValue}>
                { addAllOption(developers).map((element, index) => <option key={index} value={element}> {element} </option>) }
            </select>
        </section>
    );
}