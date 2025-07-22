import { ReactElement } from "react";
import { NewsletterForm } from "@/app/_components/account";

import "./page.css";

/**
 * Page used by the Admin role to create news. It is possible to select and send existing news to all email addresses
 * in a list of email addresses subscribed for the newsletter.
 */
export default function NewsletterPage(): ReactElement {
    return (
        <main id="newsletterPage">
            <section id="selectNews">
                <h2> Have a list of news and a send button </h2>
            </section>

            <NewsletterForm />
        </main>
    );
}