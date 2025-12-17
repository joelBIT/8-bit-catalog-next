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
        <Link href={URL_ARTICLES_PAGE + "/" + article.id} className="articleCard" title={`Article about ${article.title}`}>
            <img src={"/articles/" + article.image} alt="Article image" className="article-image" />

            <h2 className="article-title"> {article.title} </h2>

            <section id="article-tags">
                {
                    article.tags?.map(tag => <div className="article-tag" key={tag}> {tag} </div>)
                }
            </section>
            
            <p className="article-text"> {article.introduction} </p>
        </Link>
    )
}