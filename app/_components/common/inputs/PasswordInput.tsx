'use client';

import { arima } from "@/app/_fonts/fonts";
import { ReactElement, useState } from "react";

import "./PasswordInput.css";

export function PasswordInput({ id, placeholder }: { id: string, placeholder: string }): ReactElement {
    const [ isVisible, setVisible ] = useState<boolean>(false);
    
    return (
        <section className="input">
            <input 
                id={id}
                name={id} 
                type={isVisible ? "text" : "password"}
                placeholder={placeholder}
                className={`${arima.className} form__field`}
                autoComplete="off" 
                required 
            />

            <label htmlFor={id} className="form__label"> {placeholder} </label>

            <span className="material-symbols-outlined" onClick={() => setVisible(!isVisible)}>
                {isVisible ? "visibility_off" : "visibility"}
            </span>
        </section>
    );
}