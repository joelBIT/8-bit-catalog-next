import Link from "next/link";
import { ReactElement } from "react";

export default function GameDetails(): ReactElement {
    return (
        <main>
            <h1>Game Details Page</h1>
            <Link href="/">Home</Link>
            <Link href="/gameDetails/6">Double Dragon</Link>
        </main>
    );
}