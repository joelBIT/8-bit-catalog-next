import { ReactElement } from "react";
import { ArticleCard } from "@/app/_components/common";
import { Article } from "@/app/_types/types";
import { getAllArticles } from "@/app/_db/articles-db";

import "./page.css";

export default async function ArchitecturePage(): Promise<ReactElement> {
    let articles: Article[] = [];
    
    try {
        if (!articles.length) {
            articles = await getAllArticles();
        }
    } catch (error) {
        console.log(error);
    }

    return (
        <main id="architecturePage">
            <h1 className="architecture-title"> Architecture </h1>

            <section className="architecture-introduction">
                <h2 className="architecture-heading">NES Architecture</h2>
                    <p className="architecture-text">
                        It is regarded as one of the most influential gaming consoles.
                        The NES pioneered a now-standard business model of licensing third-party developers to produce and distribute games.
                        It was released in Japan on July 15, 1983, as the Family Computer (Famicom). Today, the NES is the 14th best-selling console 
                        of all time and has a thriving community.
                        The console has 1,377 licensed games globally, and the community has produced many unofficial games.
                        <br /><br />
                        The Nintendo Entertainment System has the following components: 2A03 CPU based on the MOS Technology 6502 8-bit microprocessor, 
                        2C02 PPU (picture processing unit), serial input for game controllers, audio output comprising four tone generators and a delta 
                        modulation playback device, 2 KiB of RAM for use by the CPU and 2 KiB of RAM for use by the PPU.
                        <br /><br />
                        The NES has two general-purpose controller ports on the front of the console, as well as a (rarely used) 48-pin expansion port 
                        underneath. The Famicom's standard controllers are hardwired to the front of the unit, and a special 15-pin expansion port 
                        is commonly used for third-party controllers. The AV Famicom, however, features detachable controllers using the same 
                        ports as the NES. The NES and Famicom have a set of I/O ports used for controllers and other peripherals.
                    </p>
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
                <h2 className="articles-heading">NES Articles</h2>
                <p className="articles-text">
                    Read about the NES architecture. You can find an overview in the articles below.
                </p>

                <section id="articles">
                    {
                        articles.length > 0 ? 
                            articles?.map((article: Article) => <ArticleCard article={article} key={article.title}/>)
                            :
                            <h2 className="message-failure"> Could not load articles </h2>
                    }
                </section>
            </section>

            <div className="darken-image-bottom" />
        </main>
    )
}