'use server';

import { ReactElement } from "react";
import { arima } from "@/fonts/fonts";
import { addAllOption } from "@/app/_utils/utils";
import { getAllDevelopers } from "@/app/_db/db";

/**
 * Since this filter is used for searching games it contains the 'All' option to search for games by all developers.
 */
export async function DeveloperFilter({ defaultValue } : { defaultValue: string }): Promise<ReactElement> {
    return (
        <section className="selectSection">
            <h2 className={`selectSection__title ${arima.className}`}> Developer </h2>

            <select className="selectSection__select" name="developer" defaultValue={defaultValue}>
                { addAllOption(await getAllDevelopers()).map((element, index) => <option key={index} value={element}> {element} </option>) }
            </select>
        </section>
    );
}