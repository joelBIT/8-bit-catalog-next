import { ReactElement } from "react";
import styles from "./logo.module.css";
import Image from 'next/image';
import logo from "../../assets/Logo.jpeg";

export function Logo(): ReactElement {
    return (
        <figure id={styles.logo}>
            <Image src={logo} alt="logo" width={200} className={styles.img} />
        </figure>
    );
}