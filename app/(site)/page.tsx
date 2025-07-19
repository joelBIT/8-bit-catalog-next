import { ReactElement } from "react";
import Link from "next/link";
import { Logo } from "../_components/header";
import { TitleSearch } from "@/app/_components/home/TitleSearch";
import { getAllTitles } from "@/app/_db/db";
import { isAuthenticated } from "@/app/_session/utils";

import "./page.css";

/**
 * Landing page of the application.
 */
export default async function Home(): Promise<ReactElement> {

    return (
        <main id="landingPage">
            <section id="firstSection">
                <section id="image-wrapper">
                    <Logo />
                </section>

                <section id="catalogDescription">
                    <hr />
                    <h1 className="description-heading bit-font">
                        8-BIT ENTHUSIASTS
                    </h1>
                    <h2 className="catalog-description">
                        The 8-bit Catalog provides a way to connect with other 8-bit enthusiasts.
                    </h2>
                    <h3 className="description-text">
                        The purpose of the 8-bit Catalog is to be an as accomplished source of NES games as possible.
                        This catalog is continuously updated with new information. Games supported by the emulator
                        found at <Link href="https://emulator.joel-rollny.eu/" target="_blank"> emulator.joel-rollny.eu </Link>
                        can be played in a browser.
                        Become a member to connect with other 8-bit enthusiasts.
                    </h3>

                    {
                        await isAuthenticated() ?
                            <></>
                            :
                            <section id="landing-register">
                                <Link href="/register" id="registerButton" className="authButton"> REGISTER </Link>
                            </section>
                    }
                    <hr />
                </section>
            </section>

            <section id="secondSection">
                <h2> Try the catalog and see if you can find the game you are looking for! </h2>
                <TitleSearch titles={await getAllTitles()} />
            </section>

            <section id="thirdSection">

            </section>
        </main>
    );
}
