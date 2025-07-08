import { ReactElement } from "react";
import Link from "next/link";
import { Logo } from "../_components/header";
import { isAuthenticated } from "@/app/_session/utils";
import { arima } from "@/app/_fonts/fonts";
import { getAllTitles } from "@/app/_db/db";

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
                {
                    await isAuthenticated() ? <></> : <Link href="/register" id="registerButton" className="authButton"> REGISTER </Link>
                }
            </section>

            <section id="suggestion-search">
                <input
                    id="gameSearch"
                    type="text"
                    list="suggestions"
                    className={arima.className}
                    placeholder="Game Title"
                />
                <datalist id="suggestions">
                    {
                        (await getAllTitles()).map(title => <option value={title} key={title} />)
                    }
                </datalist>

                <button id="viewButton" className="button__link"> View </button>
            </section>
        </main>
    );
}