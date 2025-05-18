import { ReactElement } from "react";
import { arima } from "@/app/_fonts/fonts";

import "./EmailInput.css";

export function EmailInput(): ReactElement {
    return (
        <section id="emailInput">
            <span className="material-symbols-outlined"> mail </span>

            <div className="email-input">
                <input 
                    id="email"
                    name="email" 
                    type="email" 
                    placeholder="Email"
                    className={`${arima.className} form__field`}
                    autoComplete="off" 
                    required 
                />

                <label htmlFor="email" className="form__label"> Email </label>
            </div>
        </section>
    );
}