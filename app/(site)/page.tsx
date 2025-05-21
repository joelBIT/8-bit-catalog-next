import { ReactElement } from "react";
import { Logo } from "../_components/header";
import { irishGrover } from "../_fonts/fonts";

import "./page.css";

/**
 * Landing page of the application.
 */
export default async function Home(): Promise<ReactElement> {

    return (
        <main id="landingPage">
            <section id="image-wrapper">
                <svg viewBox="0 0 30 3">
                    <path id="landing-title" fill="none" d="M 0 5 Q 15 -5 30 5" pathLength="2" />
                    <text id="landing-text" fill="#f0cca4" className={`${irishGrover.className}`} font-size="2" dominant-baseline="hanging" text-anchor="middle">
                        <textPath href="#landing-title" startOffset="1">
                            The 8-bit Catalog
                        </textPath>
                    </text>
                </svg>

                <Logo />
            </section>

            <section id="content">

            </section>
        </main>
    );
}