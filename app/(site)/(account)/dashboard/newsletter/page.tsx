'use server';

import { ReactElement } from "react";
import { NewsletterForm } from "@/app/_components/account";
import { NewsList } from "@/app/_components/common";
import { getAllNews } from "@/app/_db/db";

import "./page.css";

/**
 * Page used by the Admin role to create news. It is possible to select and send existing news to all email addresses
 * in a list of email addresses subscribed for the newsletter.
 */
export default async function NewsletterPage(): Promise<ReactElement> {
    return (
        <main id="newsletterPage">
            <NewsList news={await getAllNews()} />

            <NewsletterForm />
        </main>
    );
}