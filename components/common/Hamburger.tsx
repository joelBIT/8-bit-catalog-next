import { ReactElement } from "react";

import "./Hamburger.css";

export function Hamburger(): ReactElement {
    return (
        <section id="hamburger">
            <input id="hamburger-checkbox" type="checkbox" />
            <label htmlFor="hamburger-checkbox" className="hamburger-side">
                <i></i>
                <div className="text">
                    <h3 className="close"> close </h3>
                    <h3 className="open"> menu </h3>
                </div>
            </label>
        </section>
    );
}