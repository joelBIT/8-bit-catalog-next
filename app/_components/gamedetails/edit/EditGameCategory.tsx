import { ReactElement } from "react";
import { arima } from "@/fonts/fonts";

/**
 * Edit a game's category. Then it is possible to find the game by searching on the updated value (using the category search filter).
 */
export function EditGameCategory({ categories, defaultValue }: { categories: string[], defaultValue: string }): ReactElement {
    return (
        <section className="selectSection categorySection">
            <h2 className={`selectSection__title ${arima.className}`}> Category </h2>
            <select name="category" className="selectSection__select" defaultValue={defaultValue}>
                { categories.map((element, index) => <option key={index} value={element}> {element} </option>) }
            </select>
        </section>
    );
}