import { ReactElement } from "react";
import Link from "next/link";
import { Article } from "@/app/_types/types";

import "./ArticleCard.css";

/**
 * Card for articles. Used in the architecture page for presenting articles covering the NES architecture.
 */
export function ArticleCard({ article }: { article: Article }): ReactElement {
    return (
        <Link href={article.link} className="articleCard" title={`Article about ${article.title}`}>
            <img src={article.image} alt="Article image" />
            <section id="article-tags">
                {
                    article.tags.map(tag => <div className="article-tag"> {tag} </div>)
                }
            </section>
            
            <h2 className="article-title"> {article.title} </h2>
            <p className="article-text"> {article.text} </p>
        </Link>
    )
}