'use server';

import { type ReactElement } from "react";
import { Logo } from "../_components/header";
import { LandingCard, LandingSelection, TitleSearch } from "@/app/_components/home";
import { getAllNews, getAllTitles } from "@/app/_db/db";

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
                    <LandingCard heading="Vision" text="A place for all things related to the Nintendo Entertainment System, where it is possible to connect with other 8-bit enthusiasts."/>
                    <LandingCard heading="Solution" text="The 8-bit Catalog. This catalog is continuously updated with new information and functionality. Become a member to connect with other 8-bit enthusiasts." />
                </section>

                <section id="searchGameArea">
                    <TitleSearch titles={await getAllTitles()} />
                </section>
            </section>

            <section id="secondSection">
                <LandingSelection news={await getAllNews()} />
            </section>

            <div className="darken-image-bottom" />
        </main>
    );
}
