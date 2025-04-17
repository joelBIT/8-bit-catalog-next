import { ReactElement } from "react";

import "./Hamburger.css";

export function Hamburger(): ReactElement {
    return (
        <>
            <input id="hamburger-side" type="checkbox" />
            <label htmlFor="hamburger-side" className="hamburger-side">
                <i></i>
                <div className="text">
                    <h3 className="close"> close </h3>
                    <h3 className="open"> menu </h3>
                </div>
            </label>
        </>
    );
}