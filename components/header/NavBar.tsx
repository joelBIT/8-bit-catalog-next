'use client';

import Link from "next/link";
import { ReactElement } from "react";
import styles from "./navbar.module.css";
import { rancho } from "@/fonts/fonts";
import { usePathname } from "next/navigation";

export function NavBar(): ReactElement {
    const pathname = usePathname();
    
    return (
        <nav className={styles.navbar}>
            <ul className={styles.ul}>
                <li className={styles.li}>
                    <Link href="/search" className={pathname === "/search" ? `active ${styles.link}` : `${styles.link}`}>
                        <h2 className={`${styles.h2} ${rancho.className}`}>Games</h2>
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link href="/favourites" className={pathname === "/favourites" ? `active ${styles.link}` : `${styles.link}`}>
                        <h2 className={`${styles.h2} ${rancho.className}`}>Favourites</h2>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}