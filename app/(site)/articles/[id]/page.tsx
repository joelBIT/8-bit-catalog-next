import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { URL_HOME } from "@/app/_utils/utils";
import { getArticleById } from "@/app/_db/articles-db";

import "./page.css";

/**
 * Article about some part of the NES architecture.
 */
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
                <Image 
                    src="/articles/architecture.avif"
                    className="article-image" 
                    alt="Article image" 
                    width={1232} 
                    height={480} 
                    loading="eager" 
                    placeholder="blur"
                    blurDataURL="/articles/architecture.avif"
                />

                <section id="article-title">
                    <h2 className="article-title"> {article.title} </h2>
                    <p className="article-title-text"> {article.introduction} </p>
                </section>

                <div className="darken-image-bottom" />
            </figure>

            <h2 className="article-text"> {article.text} </h2>

            {
                article.article_contents?.map(content => 
                    <section key={content.heading} className="article-content">
                        <h2 className="article-content__heading"> {content.heading} </h2>
                        <p className="article-content__text"> {content.text} </p>
                    </section>
                )
            }
        </main>
    )
}