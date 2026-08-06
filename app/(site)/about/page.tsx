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
                and features.
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

            <section className="about-journey">
                <h2 className="journey-heading">The journey</h2>

                <section className="journey-timeline">
                    <div className="timeline-item first">
                        <div className="timeline-dot"></div>
                        <p className="timeline-year">2024</p>
                        <p className="timeline-title">Founded in a kitchen</p>
                        <p className="timeline-desc">Work on the catalog commenced.</p>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <p className="timeline-year">2025</p>
                        <p className="timeline-title">Sockets and accounts</p>
                        <p className="timeline-desc">Members can connect with each other in real time.</p>
                    </div>

                    <div className="timeline-item current">
                        <div className="timeline-dot"></div>
                        <p className="timeline-year">2026</p>
                        <p className="timeline-title">Today</p>
                        <p className="timeline-desc">Released the catalog as an mobile app.</p>
                    </div>
                </section>
            </section>

            <div className="darken-image-bottom" />
        </main>
    );
}