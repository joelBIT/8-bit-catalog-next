'use client';

import { ReactElement } from "react";

import "./LandingButton.css";

export function LandingButton({text, onClick}: {text: string, onClick: () => void}): ReactElement {
    return (
        <button className="landingButton" onClick={onClick}>
            {text}
        </button>
    );
}