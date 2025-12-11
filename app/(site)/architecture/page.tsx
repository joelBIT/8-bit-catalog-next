import { ReactElement } from "react";

import "./page.css";

export default function ArchitecturePage(): ReactElement {
    return (
        <main id="architecturePage">
            <section id="architecture-top">
                <article className="architecture-top-left">
                    <div className="nintendo-presentation">
                        Upper part
                    </div>

                    <section className="nintendo-info">
                        <div className="nintendo-info-sold"> Lower part left </div>
                        <div className="nintendo-info-community"> Lower part right </div>
                    </section>
                </article>

                <article className="architecture-top-right">
                    <img src="/nesconsole.webp" className="architecture-image" />
                </article>
            </section>
            
            <h2 className="architecturePage-title"> NES Console Architecture </h2>
            <h3 className="architecturePage-title-text">
                Read about the NES console architecture. The general architecture is covered in the following articles.
            </h3>

            
        </main>
    )
}