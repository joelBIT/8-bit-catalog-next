import { ReactElement } from "react";
import styles from "./fieldSetFrame.module.css";
import { silkScreen } from "@/fonts/fonts";

export function FieldSetFrame({ legend, body }: { legend: string, body: ReactElement }): ReactElement {
    return (
        <section id={styles.fieldSetFrame}>
            <fieldset className={styles.fieldset}>
                <legend className={`${styles.legend} ${silkScreen.className}`}>{legend}</legend>
                { body }
            </fieldset>
        </section>
    );
}