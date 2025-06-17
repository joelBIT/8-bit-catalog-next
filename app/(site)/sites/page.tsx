import { ReactElement } from "react";
import Link from "next/link";

import "./page.css";

/**
 * Site containing links and descriptions about other related and interesting sites.
 */
export default function SitesPage(): ReactElement {
    return (
        <main id="sitesPage">
            <section id="sitesBackground">
                <div className="darken-image-top" />
                <h1 className="sites-title playfair-display-regular"> Other 8-bit resources </h1>
                <div className="darken-image-bottom" />
            </section>

            <section id="other-site-cards">
                <Link id="nesDev" className="other-page-card" href="https://www.nesdev.org/" target="_blank">
                    <section className="other-information">
                        <h2 className="site-title"> NesDev </h2>
                        <div className="site-description">
                            A community of homebrew game developers and hardware researchers for the Nintendo Entertainment System (NES) and other retro consoles.
                        </div>
                    </section>
                </Link>

                <Link id="nesCart" className="other-page-card" href="https://nescartdb.com/" target="_blank">
                    <section className="other-information">
                        <h2 className="site-title"> NES Cart Database </h2>
                        <div className="site-description">
                            Dive into detailed information about NES carts and their hardware.
                        </div>
                    </section>
                </Link>

                <Link id="nesNinja" className="other-page-card" href="https://nesninja.com/game/nes/" target="_blank">
                    <section className="other-information">
                        <h2 className="site-title"> NES Ninja </h2>
                        <div className="site-description">
                            Play all the classic 8-bit Nintendo video games online for free. Download retro NES game on NESNinja.com.
                        </div>
                    </section>
                </Link>

                <Link id="romDetectives" className="other-page-card" href="http://www.romdetectives.com/Wiki/index.php" target="_blank">
                    <section className="other-information">
                        <h2 className="site-title"> ROM Detectives </h2>
                        <div className="site-description">
                            Your Wiki guide to video game hacking. Their goal is to reverse engineer every video game ever made to understand how they were programmed.
                        </div>
                    </section>
                </Link>
            </section>
        </main>
    );
}