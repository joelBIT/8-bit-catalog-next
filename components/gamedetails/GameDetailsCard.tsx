import { ReactElement } from "react";
import { Game } from "@/interfaces/interfaces";
import styles from "./gameDetailsCard.module.css";
import { silkScreen } from "@/fonts/fonts";

export function GameDetailsCard({ game }: { game: Game }): ReactElement {

    return (
        <section id={styles.gameDetailsCard}>
            <figure className={styles.figure}>
                <img src={`../../covers/${game.cover}`} alt="Game Cover" className={styles.img}/>
            </figure>
            
            <article id={styles.gameDetails} className={silkScreen.className}>
                <h1 className={styles.h1}>{game.title}</h1>
                <h2 className={styles.h2}>Category: <p className={styles.p}>{game.category}</p></h2>
                <h2 className={styles.h2}>Released: <p className={styles.p}>{game.releaseDate ? game.releaseDate : game.releaseYear}</p></h2>
                <h2 className={styles.h2}>Players: <p className={styles.p}>{game.players}</p></h2>
                <h2 className={styles.h2}>Publisher: <p className={styles.p}>{game.publisher}</p></h2>
                <h2 className={styles.h2}>Developer: <p className={styles.p}>{game.developer}</p></h2>
            </article>

            <article id={styles.description}>
                { game.description ? game.description.map((paragraph, index) => <p className={styles.p} key={index}>{paragraph}</p>) : <></> }
            </article>
        </section>
    );
}