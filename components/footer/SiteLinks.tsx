import Link from "next/link";
import { ReactElement } from "react";
import styles from "./sitelinks.module.css";

export function SiteLinks(): ReactElement {

    return (
        <section id={styles.siteLinks}>
            <h2 className={styles.h2}>Site Links</h2>
            <ul className={styles.ul}>
                <li>
                    <Link href="/" className={styles.link}>
                        <h4 className={styles.h4}>Home</h4>
                    </Link>
                </li>
                <li>
                    <Link href="/about" className={styles.link}>
                        <h4 className={styles.h4}>About</h4>
                    </Link>
                </li>
                <li>
                    <Link href="/account" className={styles.link}>
                        <h4 className={styles.h4}>Account</h4>
                    </Link>
                </li>
            </ul>
        </section>
    );
}