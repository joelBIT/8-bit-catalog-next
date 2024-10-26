import { ReactElement } from "react";
import styles from "./home.module.css";
import { HeroCard } from "@/components/home/HeroCard";
import { createGameList } from "@/data/data";

/**
 * A random game is presented to the user every time the landing page is visited.
 */
export default function Home(): ReactElement {
  const games = createGameList();
  
  return (
      <main id={styles.landingPage}>
          <HeroCard game={games[Math.floor(Math.random() * games.length + 1)]} />
      </main>
  );
}