import { ReactElement } from "react";

import "./page.css";

export default async function ArticlePage({params}: {params: Promise<{ id: string }>}): Promise<ReactElement> {
    const { id } = await params;

    return (
        <main id="articlePage">
            {id}
        </main>
    )
}