'use client';

import { ReactElement, useContext } from "react";
import { FilterContext } from "@/contexts";
import { arima } from "@/fonts/fonts";
import { addAllOption } from "@/utils/utils";

/**
 * Since this filter is used for searching games it contains the 'All' option to search for games by all publishers.
 */
export function PublisherFilter({ defaultValue } : { defaultValue: string }): ReactElement {
    const { publishers } = useContext(FilterContext);

    return (
        <section className="selectSection">
            <h2 className={`selectSection__title ${arima.className}`}> Publisher </h2>

            <select className="selectSection__select" name="publisher" defaultValue={defaultValue}>
                { addAllOption(publishers).map((element, index) => <option key={index} value={element}> {element} </option>) }
            </select>
        </section>
    );
}