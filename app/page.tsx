'use client';

import { ReactElement, useState } from "react";
import { HeroCard } from "@/components/home/HeroCard";
import { createGameList } from "@/data/data";

import "./page.css";

/**
 * A random game is presented to the user every time the landing page is visited.
 */
export default function Home(): ReactElement {
    const [ randomGame ] = useState(games[Math.floor(Math.random() * games.length + 1)]);
  
    return (
        <main id="landingPage">
            <HeroCard game={randomGame} />
        </main>
    );
}

const games = createGameList();