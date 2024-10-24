import { ReactElement } from "react";
import styles from "./otherlinks.module.css";

export function OtherLinks(): ReactElement {
    return (
        <section id={styles.otherLinks}>
            <h2 className={styles.h2}>Other Links</h2>
            <ul className={styles.ul}>
                <li>
                    <a href="https://www.nesdev.org/" target="_blank" className={styles.link}>
                        <h4 className={styles.h4}>NesDev</h4>
                    </a>
                </li>
                <li>
                    <a href="https://nesninja.com/game/nes/" target="_blank" className={styles.link}>
                        <h4 className={styles.h4}>NES Ninja</h4>
                    </a>
                </li>
                <li>
                    <a href="https://nescartdb.com/" target="_blank" className={styles.link}>
                        <h4 className={styles.h4}>NesCartDB</h4>
                    </a>
                </li>
                <li>
                    <a href="http://www.romdetectives.com/Wiki/index.php" target="_blank" className={styles.link}>
                        <h4 className={styles.h4}>ROM Detectives</h4>
                    </a>
                </li>
            </ul>
        </section>
    );
}