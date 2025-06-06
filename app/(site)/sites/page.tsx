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
                <p className="card-description"> A community of homebrew game developers and hardware researchers for the Nintendo Entertainment System (NES) and other retro consoles. </p>
            </Link>

            <Link id="nesCart" className="other-page-card" href="https://nescartdb.com/" target="_blank">
                <section className="background-wrapper" />
                <h1 className="card-title"> NES Cart Database </h1>
                <p className="card-description"> Dive into detailed information about NES carts and their hardware. </p>
            </Link>

            <Link id="nesNinja" className="other-page-card" href="https://nesninja.com/game/nes/" target="_blank">
                <section className="background-wrapper" />
                <h1 className="card-title"> NES Ninja </h1>
                <p className="card-description"> Play all the classic 8-bit Nintendo video games online for free. Download retro NES game on NESNinja.com. </p>
            </Link>

            <Link id="romDetectives" className="other-page-card" href="http://www.romdetectives.com/Wiki/index.php" target="_blank">
                <section className="background-wrapper" />
                <h1 className="card-title"> ROM Detectives </h1>
                <p className="card-description"> Your Wiki guide to video game hacking. Their goal is to reverse engineer every video game ever made to understand how they were programmed. </p>
            </Link>
        </main>
    );
}