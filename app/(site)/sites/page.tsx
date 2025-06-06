import { ReactElement } from "react";
import Link from "next/link";

import "./page.css";

/**
 * Site containing links and descriptions about other related and interesting sites.
 */
export default function SitesPage(): ReactElement {
    return (
        <main id="sitesPage">
            <Link id="nesDev" className="other-page-card" href="https://www.nesdev.org/" target="_blank">
                <section className="background-wrapper" />
                <h1 className="card-title"> NesDev </h1>
            </Link>

            <Link id="nesCart" className="other-page-card" href="https://nescartdb.com/" target="_blank">
                <section className="background-wrapper" />
                <h1 className="card-title"> NesCartDB </h1>
            </Link>

            <Link id="nesNinja" className="other-page-card" href="https://nesninja.com/game/nes/" target="_blank">
                <section className="background-wrapper" />
                <h1 className="card-title"> NES Ninja </h1>
            </Link>

            <Link id="romDetectives" className="other-page-card" href="http://www.romdetectives.com/Wiki/index.php" target="_blank">
                <section className="background-wrapper" />
                <h1 className="card-title"> ROM Detectives </h1>
            </Link>
        </main>
    );
}