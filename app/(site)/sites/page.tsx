'use client';

import { ReactElement, useState } from "react";
import Link from "next/link";

import "./page.css";

const sites = [
    {title: 'NesDev', description: 'NesDev is a community of game developers and hardware researchers for the Nintendo Entertainment System (NES) and other retro consoles. The site includes NES and SNES wikis as well as forums where you can find answers to many emulator-related questions.', image: '/nesdev.png', link: 'https://www.nesdev.org/'},
    {title: 'NES Cart Database', description: 'Dive into detailed information about NES carts and their hardware (e.g., PCB class and chip manufacturer). The site lists games for each mapper and is excellent for finding games corresponding to various cart and hardware properties.', image: '/nescartdb.png', link: 'https://nescartdb.com/'},
    {title: 'NES Ninja', description: 'Play all the classic 8-bit Nintendo video games for free. Download NES games on NES Ninja. The site also contains games for other retro consoles (e.g., SNES, Sega, Atari).', image: '/nesninja.png', link: 'https://nesninja.com/game/nes/'},
    {title: 'NESmakers', description: 'A forum for all things related to the NESmaker software. NESmaker is a PC software that lets anyone create playable, cartridge-based games for the original Nintendo Entertainment System (NES) without the need to write code.', image: '/nesmaker.png', link: 'https://www.nesmakers.com/'}
]

/**
 * Site containing links and descriptions about other related and interesting sites.
 */
export default function SitesPage(): ReactElement {
    const [currentSite, setCurrentSite] = useState<{title: string, description: string, image: string, link: string}>(sites[0]);
    const [overview, setOverview] = useState<boolean>(true);

    return (
        <main id="sitesPage">
            <h1 className="sites-title"> Resources </h1>

            <section id="sites">
                <section id="change-site-content">
                    <article className={currentSite.title === sites[0].title ? "site-content-link active" : "site-content-link"}>
                         <p>01.</p> <h1 onClick={() => setCurrentSite(sites[0])}> Nesdev </h1> 
                    </article>

                    <article className={currentSite.title === sites[1].title ? "site-content-link active" : "site-content-link"}> 
                        <p>02.</p> <h1 onClick={() => setCurrentSite(sites[1])}> CartDB </h1> 
                    </article>
                    
                    <article className={currentSite.title === sites[2].title ? "site-content-link active" : "site-content-link"}> 
                        <p>03.</p> <h1 onClick={() => setCurrentSite(sites[2])}> Ninja </h1> 
                    </article>
                    
                    <article className={currentSite.title === sites[3].title ? "site-content-link active" : "site-content-link"}> 
                        <p>04.</p> <h1 onClick={() => setCurrentSite(sites[3])}> NESmakers </h1> 
                    </article>
                </section>

                <section id="site-content">
                    <section id="site-content-header">
                        <h1 
                            onClick={() => setOverview(true)} 
                            className={overview ? "content-header-link active" : "content-header-link"}
                        > 
                            Overview 
                        </h1>

                        <hr/>
                        
                        <h1 
                            onClick={() => setOverview(false)} 
                            className={!overview ? "content-header-link active" : "content-header-link"}
                        > 
                            Gallery 
                        </h1>
                    </section>

                    {
                        overview ?
                            <section className="other-information">
                                <h2 className="site-title"> { currentSite.title } </h2>
                                <div className="site-description"> { currentSite.description } </div>

                                <Link className="button__link" href={currentSite.link} target="_blank">
                                    Visit <span className="material-symbols-outlined"> open_in_new </span> 
                                </Link> 
                            </section>
                            :
                            <Link href={currentSite.image} target="_blank" className="site-image-link">
                                <img src={currentSite.image} className="site-image" />
                            </Link>
                    }
                </section>
            </section>
        </main>
    );
}