import { ReactElement } from "react";

export function FieldSetFrame({ legend, body }: { legend: string, body: ReactElement }): ReactElement {
    return (
        <section id="fieldSetFrame">
            <fieldset>
                <legend>{legend}</legend>
                { body }
            </fieldset>
        </section>
    );
}