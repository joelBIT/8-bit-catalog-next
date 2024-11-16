'use client';

import { ReactElement, useRef } from "react";
import { arima } from "@/fonts/fonts";
import { ALL_OPTION_VALUE } from "@/utils/utils";

import "./Select.css";

export function Select({ title, list, defaultOption, getOption }: { title: string, list: string[], defaultOption: string, getOption: (arg0: string) => void }): ReactElement {
    const ref = useRef<HTMLSelectElement>(null);

    return (
        <section className="selectSection">
            <h2 className={`selectSection__title ${arima.className}`}>{title}</h2>
            <select 
                id={`${title.toLocaleLowerCase()}`}
                className="selectSection__select" 
                defaultValue={defaultOption} 
                ref={ref} 
                onChange={() => getOption(ref.current ? ref.current.value : ALL_OPTION_VALUE)}
            >

                {list.map((element, index) => <option key={index} value={element}>{element}</option>)}
            </select>
        </section>
    );
}