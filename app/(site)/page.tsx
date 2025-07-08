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

                <Logo />


        </main>
    );
}