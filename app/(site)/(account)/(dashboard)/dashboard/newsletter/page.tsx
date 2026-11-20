import { ReactElement } from "react";
import { NewsletterForm } from "@/app/_components/account/forms";
import { NewsList } from "@/app/_components/lists";
import { getAllNews } from "@/app/_db/news-db";
import { requireAdmin } from "@/app/_auth/server-functions";

import "./page.css";

/**
 * Page used by the Admin role to create news. It is possible to select and send existing news to all email addresses
 * in a list of email addresses subscribed for the newsletter.
 */
export default async function NewsletterPage(): Promise<ReactElement> {
    await requireAdmin();
    
    return (
        <main id="newsletterPage">
            <h1 className="newsletter-title"> Newsletter </h1>

            <section id="newsletter-content">
                <NewsList news={await getAllNews()} />

                <NewsletterForm />
            </section>
        </main>
    );
}