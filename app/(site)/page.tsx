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
                <Logo />
                <h1 className={`landing-text ${irishGrover.className}`}> The 8-bit Catalog </h1>
            </section>

            <section id="content">
                
            </section>
        </main>
    );
}