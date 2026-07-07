import { ReactElement } from "react";

import "./page.css";

export default function AboutPage(): ReactElement {
    return (
        <main id="aboutPage">
            <div className="about-title">
                About
            </div>

            <div className="darken-image-bottom" />
        </main>
    );
}