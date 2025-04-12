import { ReactElement } from "react";

import "./FieldSetFrame.css";

export function FieldSetFrame({ legend, body }: { legend: string, body: ReactElement }): ReactElement {
    return (
        <section id="fieldSetFrame">
            <fieldset className="fieldset">
                <legend className={`legend bit-font`}> { legend } </legend>
                { body }
            </fieldset>
        </section>
    );
}