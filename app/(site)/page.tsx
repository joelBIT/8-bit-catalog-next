import { ReactElement } from "react";
import Link from "next/link";
import { Logo } from "../_components/header";
import {isAuthenticated} from "@/app/_session/utils";

import "./page.css";

/**
 * Landing page of the application.
 */
export default async function Home(): Promise<ReactElement> {

    return (
        <main id="landingPage">
            <section id="image-wrapper">
                <Logo />
            </section>

            <section id="landing-register">
                <h2 className="landing-text"> Become a member to connect with other 8-bit enthusiasts </h2>
                {await isAuthenticated() ? <></> : <Link href="/register" id="registerButton" className="authButton"> REGISTER </Link> }
            </section>
        </main>
    );
}