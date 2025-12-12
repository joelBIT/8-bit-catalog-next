import { ReactElement } from "react";
import { ArticleCard } from "@/app/_components/common";

import "./page.css";

const articles = [
    {id: 1, image: "/famicom.webp", title: "Picture Processing Unit", tags: ["Graphics", "Scanline"], text: "The PPU generates a composite video signal with 240 lines of pixels, designed to be received by a television."}
]

export default function ArchitecturePage(): ReactElement {
    return (
        <main id="architecturePage">
            <img src="/donkeykong.avif" className="background-image" />

            <section id="architecture-top">
                <article className="architecture-top-left">
                    <section className="nintendo-presentation">
                        <h2 className="nintendo-presentation__heading"> Regarded as one of the most influential gaming consoles. </h2>
                        <p className="nintendo-presentation__text">
                            The NES pioneered a now-standard business model of licensing third-party developers to produce and distribute games.
                            It was released in Japan on July 15, 1983, as the Family Computer (Famicom). Today, the NES is the 14th best-selling console 
                            of all time and has a thriving community.
                        </p>
                    </section>

                    <section className="nintendo-info">
                        <ul className="nintendo-info-hardware__list">
                            <li className="nintendo-info-hardware__list-item">
                                <h4>CPU</h4> 
                                <p>8-bit</p> 
                                <p>1.66 Mhz</p>
                            </li>
                            <li className="nintendo-info-hardware__list-item">
                                <h4>Memory</h4>	
                                <p>2 Kb RAM</p> 
                                <p>Video RAM 2 Kb</p>
                            </li>
                            <li className="nintendo-info-hardware__list-item">
                                <h4>Display</h4> 
                                <p>256 x 240 pixel maximum resolution</p>
                                <p>52 colours</p> 
                                <p>8 x 16 pixel maximum sprite size</p> 
                                <p>64 sprites on-screen</p>
                            </li>
                        </ul>
                    </section>
                </article>

                <article className="architecture-top-right">
                    <img src="/nesconsole.webp" className="architecture-image" />
                </article>
            </section>

            <section id="architecture-video">
                <h2 className="architecture-video__heading"> Watch NesHacker's NES architecture video </h2>

                <iframe 
                    width="1120" 
                    height="630" 
                    src="https://www.youtube.com/embed/PwZEBE66an0?si=vpFN433xh8l4Dptt" 
                    title="NES Hacker's NES architecture video" 
                    className="architecture-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen 
                />
            </section>

            <section id="architecture-articles">
                <h2 className="architecturePage-title"> NES Console Architecture </h2>
                <h3 className="architecturePage-title-text">
                    Read about the NES console architecture. The general architecture is covered in the following articles.
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