import { ReactElement } from "react";
import { arima } from "@/fonts/fonts";

import "./NameInput.css";

export function NameInput(): ReactElement {
    return (
        <section id="nameInput">
            <span className="material-symbols-outlined"> person </span>

            <div className="name-input">
                <input 
                    id="name"
                    name="name" 
                    type="text" 
                    placeholder="Name"
                    className={`${arima.className} form__field`}
                    autoComplete="off" 
                    required 
                />

                <label htmlFor="name" className="form__label"> Name </label>
            </div>
        </section>
    );
}