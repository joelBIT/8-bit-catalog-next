'use client';

import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { LandingButton, TitleSearch } from ".";
import { URL_REGISTER_PAGE } from "@/app/_utils/utils";

import "./LandingCards.css";

export function LandingCards({allGameTitles}: {allGameTitles: string[]}): ReactElement {
    let page = 1;

    function setPage(pageNumber: number): void {
        page = pageNumber;
    }

    return (
        <section id="landingCards">
            <section className="card-navigation">
                <LandingButton icon='chevron_left' onClick={() => setPage(((page - 1) % 4) === 0 ? 3 : ((page - 1) % 4))} />
                <LandingButton icon='chevron_right' onClick={() => setPage(((page + 1) % 4) === 0 ? 1 : ((page + 1) % 4))} />    

                <h3 className="landing-title__number">{page}/3</h3>
            </section>

            <section className="landing-cards">

            </section>
        </section>
    );

    function LandingCardOne(): ReactElement {
        return (
            <section className="landing-card">
                <h3 className="landing-title__number"> .01 </h3>
                <h3 className="landing-title__heading">Vision</h3>
                <p className="landing-card__text">
                    A place for all things related to the Nintendo Entertainment System, where it is possible to 
                    connect with other 8-bit enthusiasts.
                </p>

                <figure className="nes-figure">
                    <Image 
                        src="/architecture/nesconsole.png" 
                        className="nes-image" 
                        alt="NES console" 
                        width={640} 
                        height={348} 
                        placeholder="blur"
                        blurDataURL="/architecture/nesconsole.png" 
                    />
                </figure>
            </section>
        );
    }

    function LandingCardTwo(): ReactElement {
        return (
            <section className="landing-card">
                <h3 className="landing-title__number"> .02 </h3>
                <h3 className="landing-title__heading">Solution</h3>
                <p className="landing-card__text">
                    The 8-bit Catalog.
                    This catalog is continuously updated with new information and functionality. 
                    Test the catalog by entering a game title and clicking on the View button.
                </p>

                <section id="searchGameArea">
                    <TitleSearch titles={allGameTitles} />
                </section>
            </section>
        );
    }

    function LandingCardThree(): ReactElement {
        return (
            <section className="landing-card">
                <h3 className="landing-title__number"> .03 </h3>
                <h3 className="landing-title__heading">Membership</h3>
                <p className="landing-card__text">
                    Become a member to connect with other 8-bit enthusiasts.
                    Membership unlock services including real-time interaction with 
                    other members, exclusive offers, info about retro events, and more.
                </p>

                <Link href={URL_REGISTER_PAGE} className="signup-button"> Sign up now </Link>
            </section>
        );
    }
}