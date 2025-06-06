import { ReactElement } from "react";

import "./page.css";

/**
 * Page containing answers to frequently asked questions about the 8-bit catalog.
 */
export default function FaqPage(): ReactElement {
    return (
        <main id="faqPage">
            <section className="title-section">
                <h1 className="faqPage-title"> Frequently Asked Questions </h1>
                <h2 className="title-text"> The most frequently asked questions are gathered here. If you do not find what you are looking for, let me know, and I will be happy to assist you. </h2>
            </section>
        </main>
    );
}