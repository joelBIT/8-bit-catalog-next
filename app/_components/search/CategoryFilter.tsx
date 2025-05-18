'use server';

import { ReactElement } from "react";
import { arima } from "@/app/_fonts/fonts";
import { addAllOption } from "@/app/_utils/utils";
import { getAllCategories } from "@/app/_db/db";

/**
 * Since this filter is used for searching games it contains the 'All' option to search for games in all categories.
 */
export async function CategoryFilter({ defaultValue } : { defaultValue: string }): Promise<ReactElement> {
    return (
        <section className="selectSection">
            <h2 className={`selectSection__title ${arima.className}`}> Category </h2>

            <select className="selectSection__select" name="category" defaultValue={defaultValue}>
                { addAllOption(await getAllCategories()).map((element, index) => <option key={index} value={element}> {element} </option>) }
            </select>
        </section>
    );
}