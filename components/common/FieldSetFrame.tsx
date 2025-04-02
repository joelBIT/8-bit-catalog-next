import { ReactElement } from "react";
import { silkScreen } from "@/fonts/fonts";

import "./FieldSetFrame.css";

export function FieldSetFrame({ legend, body }: { legend: string, body: ReactElement<ReactElement> }): ReactElement<ReactElement> {
    
    return (
        <section id="fieldSetFrame">
            <fieldset className="fieldset">
                <legend className={`legend bit-font`}> { legend } </legend>
                { body }
            </fieldset>
        </section>
    );
}