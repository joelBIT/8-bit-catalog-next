import { ReactElement } from "react";
import Link from "next/link";
import { Article } from "@/app/_types/types";
import { URL_ARTICLES_PAGE } from "@/app/_utils/utils";

import "./ArticleCard.css";

/**
 * Card for articles. Used in the architecture page for presenting articles covering the NES architecture.
 */
export function ArticleCard({ article }: { article: Article }): ReactElement {
    return (
        <section className="articleCard">
            <Link href={URL_ARTICLES_PAGE + "/" + article.id} className="article-image-link" title={`Article about ${article.title}`}>
                <article className="article-image-container">
                    <img src={"/articles/" + article.image} className="article-image" alt="Article image" />
                </article>
            </Link>

            <section className="content">
                <h1 className="content-title">{ article.title }</h1>

                <section className="article-tags">
                    {
                        article.tags?.map((tag: string) => <div className="article-tag" key={tag}> {tag} </div>)
                    }
                </section>

                <p className="content-text">{ article.introduction }</p>
            </section>
            
            <section className="article-bottom">
                <Link href={URL_ARTICLES_PAGE + "/" + article.id} className="article-link">
                    READ MORE
                </Link>
            </section>
        </section>
    )
}