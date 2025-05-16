import { ReactElement } from "react";

import "./page.css";

export default function AboutPage(): ReactElement<ReactElement> {
    return (
        <main id="aboutPage">
            <section id="aboutPage-content">
                <p className={`aboutPage__paragraph bit-font`}>
                    The purpose of the 8-bit Catalog is to be an as accomplished source of NES games as possible.
                    This catalog is continuously updated with new information.
                </p>

                <p className={`aboutPage__paragraph bit-font`}>
                    Games supported by the emulator found at URL <i>emulator.joel-rollny.eu</i> can be played in a browser.
                    An increasing number of games will be supported over time due to the emulator being an ongoing project.
                </p>
            </section>
        </main>
    );
}