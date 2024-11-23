'use client';

import { ReactElement, useEffect, useState } from "react";
import { HeroCard } from "@/components/home/HeroCard";
import { Game } from "@/interfaces/interfaces";

import "./page.css";

/**
 * A random game is presented to the user every time the landing page is visited.
 */
export default function Home(): ReactElement {
    const [ randomGame, setRandomGame ] = useState<Game>();

    useEffect(() => {
        getRandomGame();
    }, []);

    async function getRandomGame() {
        try {
            const response = await fetch(`/api/game?id=${randomID()}`);
            const data = await response.json();
            setRandomGame(data);

        } catch (error) {
            console.error(error);
        }
    }

    function randomID() {
        return Math.floor(Math.random() * 970 + 1);
    }
  
    return (
        <main id="landingPage">
            { randomGame ? <HeroCard game={randomGame} /> : <></> }
        </main>
    );
}