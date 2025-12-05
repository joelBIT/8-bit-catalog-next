'use client';

import { ReactElement, useState } from "react";
import Link from "next/link";

import "./page.css";

const sites = [
    {title: 'NesDev', description: 'A community of homebrew game developers and hardware researchers for the Nintendo Entertainment System (NES) and other retro consoles.', image: '/nesdev.png', link: 'https://www.nesdev.org/'},
    {title: 'Nes Cart Database', description: 'Dive into detailed information about NES carts and their hardware.', image: '/nescartdb.png', link: 'https://nescartdb.com/'},
    {title: 'NES Ninja', description: 'Play all the classic 8-bit Nintendo video games online for free. Download retro NES game on NESNinja.com.', image: '/nesninja.png', link: 'https://nesninja.com/game/nes/'},
    {title: 'ROM Detectives', description: 'Your Wiki guide to video game hacking. Their goal is to reverse engineer every video game ever made to understand how they were programmed.', image: '/romdetectives.png', link: 'http://www.romdetectives.com/Wiki/index.php'}
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
                        <p>04.</p> <h1 onClick={() => setCurrentSite(sites[3])}> Detectives </h1> 
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