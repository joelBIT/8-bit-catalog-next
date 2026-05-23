'use client';

import { ReactElement, useState } from "react";

import "./LandingCards.css";

export function LandingCards(): ReactElement {
    const [page, setPage] = useState<number>(1);

    return (
        <section id="landingCards">
            <section className="card-navigation">
                <button id="prevButton" onClick={() => setPage(((page - 1) % 4) === 0 ? 3 : ((page - 1) % 4))}>
                    <span className="material-symbols-outlined arrow"> chevron_left </span>
                </button>

                <button id="nextButton" onClick={() => setPage(((page + 1) % 4) === 0 ? 1 : ((page + 1) % 4))}>
                    <span className="material-symbols-outlined arrow"> chevron_right </span>
                </button>

                <h3 className="landing-title__number">{page}/3</h3>
            </section>
        </section>
    );
}