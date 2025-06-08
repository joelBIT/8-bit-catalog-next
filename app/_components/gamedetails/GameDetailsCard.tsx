import { ReactElement } from "react";
import Link from "next/link";
import Image from 'next/image';
import { Game } from "@/app/_types/types";
import { PlayRomLink } from "./PlayRomLink";

import "./GameDetailsCard.css";

/**
 * Show metadata of the supplied game in the UI.
 */
export function GameDetailsCard({ game }: { game: Game }): ReactElement {
    const STORAGE_URL = process.env.NEXT_PUBLIC_COVER;

    const GAME_DETAILS = [
        {text: game?.category, icon: "category", title: "Game Category"},
        {text: game?.release_date, icon: "calendar_month", title: "Release Date"},
        {text: game?.players, icon: "videogame_asset", title: "Players"},
        {text: game?.publisher, icon: "corporate_fare", title: "Game Publisher"},
        {text: game?.developer, icon: "code", title: "Game Developer"}
    ]

    return (
        <section id="gameDetailsCard">
            <article id="game-cover-tags">

                <section id="cover-wrapper">
                    <Image 
                        src={STORAGE_URL + game?.cover}
                        unoptimized
                        className="gameDetailsCard-image"
                        alt="Game Cover"
                        width={900}
                        height={470}
                    />

                    <Link href={STORAGE_URL + game?.cover} target="_blank" className="gameDetailsCard__link">
                        Open cover
                        <span className="material-symbols-outlined"> open_in_new </span>
                    </Link>
                </section>

                <article id="gameDetails" className="bit-font">
                    <h1 className="gameDetails__title permanent-marker-regular"> {game?.title} </h1>

                    <section className="game-tags">
                        {
                            GAME_DETAILS.map(detail => 
                                <section className="tag" key={detail.title} title={detail.title}>
                                    <span className="material-symbols-outlined"> {detail.icon} </span>
                                    <h2 className="tag-text"> {detail.text} </h2>
                                </section>
                            )
                        }
                    </section>

                    { game?.rom ? <PlayRomLink id={game?.id} /> : <></> }
                </article>
            </article>

            <article id="gameDetailsCard__description">
                { game?.description }
            </article>
        </section>
    )
}