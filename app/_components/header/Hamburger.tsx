import { ReactElement } from "react";

import "./Hamburger.css";

/**
 * The 'checked' parameter is the initial state for the Hamburger.
 */
export function Hamburger({ checked, setCheck }: { checked: boolean, setCheck: (toggle: boolean) => void }): ReactElement {

    return (
        <section id="hamburger">
            <input id="hamburger-checkbox" type="checkbox" checked={checked} onChange={() => setCheck(!checked)} />
            <label htmlFor="hamburger-checkbox" className="hamburger-label">
                <i></i>
                <div className="text">
                    <h3 className="close"> close </h3>
                    <h3 className="open"> menu </h3>
                </div>
            </label>
        </section>
    );
}