import { ReactElement } from "react";

import "./page.css";

export default function AboutPage(): ReactElement {
    return (
        <main id="aboutPage">
            <div className="about-title">
                About
            </div>

            <p className="about-text">
                The 8-bit Catalog is a place for all things related to the Nintendo Entertainment System, where it is possible to 
                connect with other 8-bit enthusiasts. It was created in 2024 and is an ongoing hobby project.
                This catalog is continuously updated with new information and functionality.
            </p>

            <p className="about-text">
                Become a member to connect with other 8-bit enthusiasts.
                Membership unlock services including real-time interaction with 
                other members, exclusive offers, info about retro events, and more.
            </p>

            <div className="darken-image-bottom" />
        </main>
    );
}