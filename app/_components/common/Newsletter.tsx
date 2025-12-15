import { ReactElement } from "react";

import "./Newsletter.css";

export function Newsletter(): ReactElement {
    return (
        <section id="newsletter">
            <h2 className="newsletter-heading"> Newsletter </h2>

            <p className="newsletter-text">
                News, updates and exclusive goodies directly in your inbox.
            </p>

            <input id="subscribeEmail" type="email" name="email" placeholder="Enter Email" required={true} autoComplete="off" />

            <button id="newsletterButton">
                Subscribe 
            </button>
        </section>
    )
}