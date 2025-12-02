'use server';

import { ReactElement } from "react";
import Link from "next/link";
import { getNewsById } from "@/app/_db/db";
import { URL_HOME } from "@/app/_utils/utils";

import "./page.css";

/**
 * Shows a specific news article corresponding to the supplied news ID.
 */
export default async function NewsPage({params}: {params: Promise<{ id: string }>}): Promise<ReactElement> {
    const { id } = await params;
    let news;
    try {
        news = await getNewsById(parseInt(id));
    } catch (error) {
        return (
            <main id="newsPage">
                <h2 className="newsPage-error"> Could not load news </h2>
                <Link href={URL_HOME} className='not-found__link'> Return Home </Link>
            </main>
        )
    }

    return (
        <main id="newsPage">
            <section id="news-top">
                {news.heading}
            </section>

            <section id="news-bottom">
                {news.text}
            </section>
            
        </main>
    )
}