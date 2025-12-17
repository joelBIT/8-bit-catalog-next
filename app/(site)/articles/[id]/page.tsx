import { ReactElement } from "react";
import Link from "next/link";
import { URL_HOME } from "@/app/_utils/utils";

import "./page.css";

const ARTICLES = [
    {image: "scanlines.jpeg", title: "Picture Processing Unit"},
    {image: "cpu.jpg", title: "Central Processing Unit"},
    {image: "soundwaves.jpeg", title: "Audio Processing Unit"},
    {image: "cartridges.jpeg", title: "Cartridges"}
]

export default async function ArticlePage({params}: {params: Promise<{ id: string }>}): Promise<ReactElement> {
    const { id } = await params;
    let article;
    
    try {
        article = ARTICLES[parseInt(id)];
    } catch (error) {
        return (
            <main id="articlePage">
                <h2 className="articlePage-error"> Could not load article </h2>
                <Link href={URL_HOME} className='not-found__link'> Return Home </Link>
            </main>
        )
    }

    return (
        <main id="articlePage">
            <section id="article-top">
                <img src={`/articles/${article.image}`} className="article-top-image" alt="Article image" />
                <div className="darken-image-bottom" />

                <h2 className="article-heading"> {article.title} </h2>
            </section>
        </main>
    )
}