import { ReactElement } from "react";
import { FieldSetFrame } from "@/components/common/FieldSetFrame";
import { silkScreen } from "@/fonts/fonts";

import "./page.css";

export default function AboutPage(): ReactElement<ReactElement> {
    return (
        <main id="aboutPage">
            <FieldSetFrame legend="About" body={<Text />} />
        </main>
    );
}

function Text(): ReactElement<ReactElement> {
    return (
        <>
            <p className={`aboutPage__paragraph ${silkScreen.className}`}>
                The purpose of the 8-bit Catalog is to be an as accomplished source of NES games as possible.
                This catalog is continuously updated with new information.
            </p>
            <p className={`aboutPage__paragraph ${silkScreen.className}`}>
                Games that have a mapper implemented by emulator.joel-rollny.eu can be played in a browser.
                An increasing number of games will be supported over time due to the emulator being an ongoing project.
            </p>
        </>
    );
}