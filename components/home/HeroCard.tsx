import { Game } from "@/interfaces/interfaces";
import { URL_GAME_DETAILS_PAGE } from "@/utils/utils";
import Link from "next/link";
import { ReactElement } from "react";
import styles from "./heroCard.module.css";
import { silkScreen, singleDay } from "@/fonts/fonts";

export function HeroCard({ game }: { game: Game }): ReactElement {
    return (
        <section id={styles.heroCard}>
            <article className={styles.article}>
                <h1 className={`${styles.h1} ${silkScreen.className}`}>{game.title}</h1>
                <Link href={`${URL_GAME_DETAILS_PAGE}/${game.id}`} className={`${styles.link} ${singleDay.className}`}>View Game</Link>
            </article>
            
            <figure className={styles.figure}>
                <img src={`../../covers/${game.cover}`} alt="Random Game Cover" className={styles.img}/>
            </figure>
        </section>
    );
}