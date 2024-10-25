'use client';

import { GameCard } from "@/components/common/GameCard";
import { FavouritesContext } from "@/contexts/FavouritesContextProvider";
import { ReactElement, useContext } from "react";
import styles from "./favourites.module.css";

export default function FavouritesPage(): ReactElement {
    const { favouritesList } = useContext(FavouritesContext);

    return (
        <main id={styles.favouritesPage}>
            <section id={styles.gameCards}>
                { favouritesList.map((game, index) => <GameCard key={index} game={game} />) }
            </section>
        </main>
    );
}