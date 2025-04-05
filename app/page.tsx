import { ReactElement } from "react";
import { HeroCard } from "@/components/home/HeroCard";
import { getGameById } from "@/db/db";

import "./page.css";

/**
 * A random game is presented to the user every time the landing page is visited.
 */
export default async function Home(): Promise<ReactElement<ReactElement>> {

    return (
        <main id="landingPage">
            <HeroCard game={await getGameById(Math.floor(Math.random() * 980 + 1))} />
            <video autoPlay muted loop id="background-video" src="/nintendo.mp4" />
        </main>
    );
}