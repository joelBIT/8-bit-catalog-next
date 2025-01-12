import { ReactElement } from "react";
import Link from "next/link";
import Image from 'next/image';
import { silkScreen } from "@/fonts/fonts";
import { Game } from "@/types/types";
import { isAuthenticated } from "@/app/utils/utils";
import { EditGameButton } from "../common/EditGameButton";

import "./GameDetailsCard.css";

export async function GameDetailsCard({ game }: { game: Game }): Promise<ReactElement> {

    return (
        <section id="gameDetailsCard">
            <figure className="gameDetailsCard__figure">
                <Link href={game.imageLink} target="_blank">
                    <Image 
                        src={game.imageLink}
                        className="gameDetailsCard__figure-cover"
                        alt="Game Cover"
                        width={500}
                        height={600}
                    />
                </Link>
            </figure>
            
            <article id="gameDetails" className={silkScreen.className}>
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
                        {game.releaseDate ? game.releaseDate : game.releaseYear}
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
            </article>

            <article id="gameDetailsCard__description">
                { game.description }
            </article>
            { await isAuthenticated() ? <EditGameButton gameId={game.id} /> : <></> }
        </section>
    );
}