'use client';

import { ReactElement } from "react";

import "./LandingButton.css";

export function LandingButton({icon, onClick}: {icon: string, onClick: () => void}): ReactElement {
    return (
        <button className="landingButton" onClick={onClick}>
            <span className="material-symbols-outlined arrow"> {icon} </span>
        </button>
    );
}