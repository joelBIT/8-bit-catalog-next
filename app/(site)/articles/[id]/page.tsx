import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { URL_HOME } from "@/app/_utils/utils";
import { getArticleById } from "@/app/_db/db";

import "./page.css";

export default async function ArticlePage({params}: {params: Promise<{ id: string }>}): Promise<ReactElement> {
    const { id } = await params;
    let article;
    
    try {
        article = await getArticleById(parseInt(id));
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
            <figure id="article-image">
                <Image src={`/articles/architecture.avif`} className="article-image" alt="Article image" width={1600} height={480} />

                <section id="article-title">
                    <h2 className="article-title"> {article.title} </h2>
                    <p className="article-title-text"> {article.introduction} </p>
                </section>

                <div className="darken-image-bottom" />
            </figure>

            <h2 className="article-text"> {article.text} </h2>
        </main>
    )
}