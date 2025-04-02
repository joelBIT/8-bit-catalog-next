import { ReactElement } from "react";
import Link from "next/link";
import Image from 'next/image';
import { Game } from "@/types/types";
import { isAuthenticatedAdmin } from "@/app/utils/utils";
import { EditGameButton } from "./edit/EditGameButton";
import { PlayRomLink } from "./PlayRomLink";

import "./GameDetailsCard.css";

export async function GameDetailsCard({ game }: { game: Game }): Promise<ReactElement<ReactElement>> {
    const STORAGE_URL = process.env.NEXT_PUBLIC_COVER;

    return (
        (<section id="gameDetailsCard">
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
                <h1 className="gameDetails__title">{game.title}</h1>

                <section className="gameDetails__metadata">
                    <h2 className="gameDetails__metadata-heading">
                        Category: 
                    </h2>
                    <p className="gameDetails__metadata-text">
                        {game.category}
                    </p>
                </section>

                <section className="gameDetails__metadata">
                    <h2 className="gameDetails__metadata-heading">
                        Released: 
                    </h2>
                    <p className="gameDetails__metadata-text">
                        {game.release_date}
                    </p>
                </section>

                <section className="gameDetails__metadata">
                    <h2 className="gameDetails__metadata-heading">
                        Players: 
                    </h2>
                    <p className="gameDetails__metadata-text">
                        {game.players}
                    </p>
                </section>

                <section className="gameDetails__metadata">
                    <h2 className="gameDetails__metadata-heading">
                        Publisher: 
                    </h2>
                    <p className="gameDetails__metadata-text">
                        {game.publisher}
                    </p>
                </section>

                <section className="gameDetails__metadata">
                    <h2 className="gameDetails__metadata-heading">
                        Developer: 
                    </h2>
                    <p className="gameDetails__metadata-text">
                        {game.developer}
                    </p>
                </section>

                { game.rom ? <PlayRomLink id={game.id} /> : <></> }
            </article>
            <article id="gameDetailsCard__description">
                { game.description }
            </article>
            
            { (await isAuthenticatedAdmin()) ? <EditGameButton gameId={game.id} /> : <></> }
        </section>)
    );
}