import Link from "next/link";
import { ReactElement } from "react";
import styles from "./navbar.module.css";
import { rancho } from "@/fonts/fonts";

export function NavBar(): ReactElement {
    
    return (
        <nav className={styles.navbar}>
            <ul className={styles.ul}>
                <li className={styles.li}>
                    <Link href="/search" className={`${styles.link} ${rancho.className}}`}>
                        <h2 className={`${styles.h2} ${rancho.className}`}>Games</h2>
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link href="/favourites" className={styles.link}>
                        <h2 className={`${styles.h2} ${rancho.className}`}>Favourites</h2>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}