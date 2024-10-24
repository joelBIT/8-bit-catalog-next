import { ReactElement } from "react";
import styles from "./contact.module.css";

export function Contact(): ReactElement {
    return (
        <section id={styles.contact}>
            <h2 className={styles.h2}>Contact</h2>
            <ul className={styles.ul}>
                <li>
                    <h4 className={styles.h4}>
                        <span className={`material-symbols-outlined ${styles.mail}`}>mail</span>
                        <a href="mailto:joel.rollny@gmail.com" className={styles.link}>joel.rollny@gmail.com</a>
                    </h4>
                </li>
                <li>
                    <h4 className={styles.h4}>
                        <span className={`material-symbols-outlined ${styles.globe}`}>globe</span> 
                        <a href="http://www.joel-rollny.eu" target="_blank" className={styles.link}>www.joel-rollny.eu</a>
                    </h4>
                </li>
                <li>
                    <h4 className={styles.h4}>
                        <span className={`material-symbols-outlined ${styles.location}`}>location_on</span> Karlstad, Sweden
                    </h4>
                </li>
            </ul>
        </section>
    );
}