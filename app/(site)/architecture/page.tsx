import { ReactElement } from "react";
import { ArticleCard } from "@/app/_components/common";

import "./page.css";

const articles = [
    {id: 1, image: "/scanlines.jpeg", title: "Picture Processing Unit", tags: ["Graphics", "Scanlines"], text: "The PPU generates a composite video signal with 240 lines of pixels, designed to be received by a television."},
    {id: 2, image: "/cpu.jpg", title: "Central Processing Unit", tags: ["CPU"], text: "The NES CPU core is based on the 6502 processor and runs at approximately 1.79 MHz (1.66 MHz in a PAL NES)."}
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
                            <li className="nintendo-info-hardware__list-item">256 x 240 pixel maximum resolution</li>
                            <li className="nintendo-info-hardware__list-item">52 colours</li> 
                            <li className="nintendo-info-hardware__list-item">8 x 16 pixel maximum sprite size</li> 
                            <li className="nintendo-info-hardware__list-item">64 sprites on-screen</li>
                        </ul>
                    </section>
                </article>

                <article className="architecture-top-right">
                    <img src="/nesconsole.webp" className="architecture-image" />
                </article>
            </section>

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