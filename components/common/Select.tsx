'use client';

import { arima } from "@/fonts/fonts";
import { ALL_OPTION_VALUE } from "@/utils/utils";
import { ReactElement, useRef } from "react";
import styles from "./select.module.css";

export function Select({ title, list, defaultOption, getOption }: { title: string, list: string[], defaultOption: string, getOption: (arg0: string) => void }): ReactElement {
    const ref = useRef<HTMLSelectElement>(null);

    return (
        <section id={`${title.toLocaleLowerCase() + "Section"}`}>
            <h2 className={`${arima.className} ${styles.h2}`}>{title}</h2>
            <select id={`${title.toLocaleLowerCase()}`} defaultValue={defaultOption} ref={ref} onChange={() => getOption(ref.current ? ref.current.value : ALL_OPTION_VALUE)}>
                {list.map((element, index) => <option key={index} value={element}>{element}</option>)}
            </select>
        </section>
    );
}