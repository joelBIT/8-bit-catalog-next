import { ReactElement } from "react";

import "./page.css";

export default function ArchitecturePage(): ReactElement {
    return (
        <main id="architecturePage">
            <section id="architecture-top">
                <img src="/nesconsole.webp" className="architecture-image" />
                <div className="darken-image-bottom" />
            </section>
            
            <h2 className="architecturePage-title"> NES Console Architecture </h2>
            <h3 className="architecturePage-title-text">
                Read about the NES console architecture. The general architecture is covered in the following articles.
            </h3>

            
        </main>
    )
}