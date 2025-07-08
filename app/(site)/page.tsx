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
            <section id="image-wrapper">
                <Logo />
            </section>

            {
                await isAuthenticated() ?
                    <></>
                :
                    <section id="landing-register">
                        <h2 className="landing-text"> Become a member to connect with other 8-bit enthusiasts </h2>
                        <Link href="/register" id="registerButton" className="authButton"> REGISTER </Link>
                    </section>
            }

            <TitleSearch titles={await getAllTitles()} />
        </main>
    );
}
