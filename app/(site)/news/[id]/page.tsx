'use server';

import { ReactElement } from "react";

import "./page.css";

export default async function NewsPage({params}: {params: Promise<{ id: string }>}): Promise<ReactElement> {
    const { id } = await params;

    return (
        <main id="newsPage">
            {id}
        </main>
    )
}