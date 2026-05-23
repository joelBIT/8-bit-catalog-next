import { ReactElement } from "react";

import "./Logo.css";

export function Logo(): ReactElement {
    return (
        <figure id="logo">
            <img src="/home/logo.png" className="logo-image" alt="The 8-Bit Catalog logo" />
        </figure>
    );
}