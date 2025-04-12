import { ReactElement } from "react";
import Link from "next/link";
import Image from 'next/image';
import { Game } from "@/types/types";
import { isAuthenticatedAdmin } from "@/app/_session/utils";
import { EditGameButton } from "./edit/EditGameButton";
import { PlayRomLink } from "./PlayRomLink";

import "./GameDetailsCard.css";

export async function GameDetailsCard({ game }: { game: Game }): Promise<ReactElement> {
    const STORAGE_URL = process.env.NEXT_PUBLIC_COVER;

    const GAME_DETAILS = [
        {heading: "Category:", text: game.category},
        {heading: "Released:", text: game.release_date},
        {heading: "Players:", text: game.players},
        {heading: "Publisher:", text: game.publisher},
        {heading: "Developer:", text: game.developer}
    ]

    return (
        <section id="gameDetailsCard">
            <figure className="gameDetailsCard__figure">
                <Link href={STORAGE_URL + game.cover} target="_blank">
                    <Image 
                        src={STORAGE_URL + game.cover}
                        unoptimized
                        className="gameDetailsCard__figure-cover"
                        alt="Game Cover"
                        width={500}
                        height={600}
                    />
                </Link>
            </figure>

            <article id="gameDetails" className="bit-font">
                <h1 className="gameDetails__title"> {game.title} </h1>

                {
                    GAME_DETAILS.map(detail => 
                        <section className="gameDetails__metadata" key={detail.heading}>
                            <h2 className="gameDetails__metadata-heading">
                                { detail.heading }
                            </h2>
                            <p className="gameDetails__metadata-text">
                                { detail.text }
                            </p>
                        </section>
                    )
                }

                { game.rom ? <PlayRomLink id={game.id} /> : <></> }
            </article>

            <article id="gameDetailsCard__description">
                { game.description }
            </article>
            
            { (await isAuthenticatedAdmin()) ? <EditGameButton gameId={game.id} /> : <></> }
        </section>
    );
}