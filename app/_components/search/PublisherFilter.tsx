'use server';

import { ReactElement } from "react";
import { arima } from "@/app/_fonts/fonts";
import { addAllOption } from "@/app/_utils/utils";
import { getAllPublishers } from "@/app/_db/db";

/**
 * Since this filter is used for searching games it contains the 'All' option to search for games by all publishers.
 */
export async function PublisherFilter({ defaultValue } : { defaultValue: string }): Promise<ReactElement> {
    return (
        <section className="selectSection">
            <h2 className={`selectSection__title ${arima.className}`}> Publisher </h2>

            <select className="selectSection__select" name="publisher" defaultValue={defaultValue}>
                { addAllOption(await getAllPublishers()).map((element, index) => <option key={index} value={element}> {element} </option>) }
            </select>
        </section>
    );
}