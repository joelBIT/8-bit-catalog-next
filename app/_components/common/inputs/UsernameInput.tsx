import { ReactElement } from "react";
import { arima } from "@/app/_fonts/fonts";

import "./UsernameInput.css";

export function UsernameInput(): ReactElement {
    return (
        <section id="usernameInput">
            <span className="material-symbols-outlined"> person </span>

            <div className="username-input">
                <input 
                    id="username"
                    name="username" 
                    type="text" 
                    placeholder="Username"
                    className={`${arima.className} form__field`}
                    autoComplete="off" 
                    required 
                />

                <label htmlFor="username" className="form__label"> Username </label>
            </div>
        </section>
    );
}