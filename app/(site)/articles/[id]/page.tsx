import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { URL_ARTICLES_PAGE, URL_HOME } from "@/app/_utils/utils";
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
            <figure id="article-figure">
                <Image 
                    src={URL_ARTICLES_PAGE + "/" + article.image}
                    className="article-image" 
                    alt="Article image" 
                    width={1232} 
                    height={480} 
                    loading="eager" 
                    placeholder="blur"
                    blurDataURL={URL_ARTICLES_PAGE + "/" + article.image}
                />

                <section className="article-heading">
                    <h2 className="article-title">{article.title}</h2>
                    <p className="article-introduction">{article.introduction}</p>
                </section>
            </figure>

            <section className="article-contents">
                <h2 className="article-text">{article.text}</h2>

                {
                    article.articleContents?.map(content => 
                        <section key={content.heading} className="content-section">
                            <h2 className="content__heading">{content.heading}</h2>
                            <p className="content__text">{content.text}</p>
                        </section>
                    )
                }
            </section>

            <div className="darken-image-bottom" />
        </main>
    )
}