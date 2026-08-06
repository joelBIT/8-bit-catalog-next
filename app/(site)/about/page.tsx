import { ReactElement } from "react";

import "./page.css";

export default function AboutPage(): ReactElement {
    return (
        <main id="aboutPage">
            <div className="about-title">
                About
            </div>

            <h1 className="about-heading">A home for the NES</h1>

            <p className="about-text">
                The 8-bit Catalog is a home for everything Nintendo Entertainment System: a place to browse, remember, and connect 
                with people who still care about 8 bits.
                Started in 2024 as a hobby project, it's grown one release at a time, with new games, facts, 
                and features added whenever there's time to add them.
            </p>

            <p className="about-text">
                Sign in to chat with other collectors in real time, hear about retro meetups first, and pick up member perks as they roll out.
            </p>

            <section className="about-stats">
                <section className="about-statistic">
                    <p className="statistic-value">2024</p>
                    <h2 className="statistic-text">Created</h2>
                </section>

                <section className="about-statistic">
                    <p className="statistic-value">~1000</p>
                    <h2 className="statistic-text">Games</h2>
                </section>

                <section className="about-statistic">
                    <p className="statistic-value">2k+</p>
                    <h2 className="statistic-text">Members</h2>
                </section>
            </section>

            <div className="darken-image-bottom" />
        </main>
    );
}