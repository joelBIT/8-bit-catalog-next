import { ReactElement } from "react";
import { arima } from "@/fonts/fonts";

import "./EmailInput.css";

export function EmailInput(): ReactElement {
    return (
        <section id="emailInput">
            <span className="material-symbols-outlined"> person </span>

            <input 
                id="email"
                name="email" 
                type="email" 
                placeholder="Email"
                className={arima.className}
                autoComplete="false" 
                required 
            />               
        </section>
    );
}