import { ReactElement } from "react";
import { ArticleCard } from "@/app/_components/common";

import "./page.css";

const articles = [
    {id: 1, image: "/articles/scanlines.jpeg", title: "Picture Processing Unit", tags: ["PPU", "Graphics", "Scanlines"], text: "The PPU generates a composite video signal with 240 lines of pixels, designed to be received by a television."},
    {id: 2, image: "/articles/cpu.jpg", title: "Central Processing Unit", tags: ["CPU", "Registers"], text: "The NES CPU core is based on the 6502 processor and runs at approximately 1.79 MHz (1.66 MHz in a PAL NES)."},
    {id: 3, image: "/articles/soundwaves.jpeg", title: "Audio Processing Unit", tags: ["APU", "Sound", "Channels"], text: "The NES APU is the audio processing unit in the NES console which generates sound for games."},
    {id: 4, image: "/articles/cartridges.jpeg", title: "Cartridges", tags: ["Games", "Mappers"], text: "NES games come in cartridges, and inside of those cartridges are various circuits and hardware."}
]

export default function ArchitecturePage(): ReactElement {
    return (
        <main id="architecturePage">
            <section id="nes-introduction">
                <section className="nes-introduction__content">
                    <h3 className="nes-introduction__subheading"> Introducing the </h3>
                    <h2 className="nes-introduction__heading"> Nintendo <i>Entertainment</i> System </h2>
                </section>

                <figure className="architecture-figure">
                    <img src="/architecture/nesconsole.png" className="architecture-image" />
                </figure>
            </section>


            <section id="architecture-top">
                <section className="nintendo-presentation">
                    <h2 className="nintendo-presentation__heading"> Regarded as one of the most influential gaming consoles. </h2>
                    <p className="nintendo-presentation__text">
                        The NES pioneered a now-standard business model of licensing third-party developers to produce and distribute games.
                        It was released in Japan on July 15, 1983, as the Family Computer (Famicom). Today, the NES is the 14th best-selling console 
                        of all time and has a thriving community.
                    </p>
                </section>

                <section className="nintendo-info">
                    <article className="nintendo-info-sold">
                        <img src="/svg/nesconsole.svg" />

                        <section>
                            <h2>14th</h2>
                            <p>best-selling console of all time</p>
                        </section>
                    </article>

                    <article className="nintendo-info-other">
                        <img src="/svg/gamepad.svg" />

                        <section>
                            <h2>1,377</h2>
                            <p>licensed games globally</p>
                        </section>
                    </article>
                </section>
            </section>

            <iframe 
                width="1120" 
                height="630" 
                src="https://www.youtube.com/embed/PwZEBE66an0?si=vpFN433xh8l4Dptt" 
                title="NES Hacker's NES architecture video" 
                className="architecture-video"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen 
            />

            <section id="architecture-articles">
                <h2 className="architecturePage-title"> NES Architecture </h2>
                <h3 className="architecturePage-title-text">
                    Read about the NES architecture. An overview of the architecture is covered in the articles below.
                </h3>

                <section id="articles">
                    {
                        articles.map(article => <ArticleCard article={article} key={article.title}/>)
                    }
                </section>
            </section>

            <div className="darken-image-bottom" />
        </main>
    )
}