'use server';

import { ReactElement } from "react";
import Image from 'next/image';
import Link from "next/link";
import { convertDateToString } from "@/app/_utils/utils";
import { getGameById } from "@/app/_db/games-db";
import { Game } from "@/app/_db/schema/games";
import { FavouriteButton, PlayButton } from "@/app/_components/games";
import ErrorPage from "@/app/_components/common/ErrorPage";

import "./page.css";

/**
 * Page containing information about a specific game.
 */
export default async function GamePage({params}: {params: Promise<{ id: string }>}): Promise<ReactElement> {
    const { id } = await params;
    let game: Game | undefined;
    const STORAGE_URL = process.env.NEXT_PUBLIC_COVER;
    
    try {
        game = await getGameById(parseInt(id));
        if (!game) {
            return (
                <ErrorPage text={`Could not find game with id ${id}`} />
            )
        }
    } catch (error) {
        return (
            <ErrorPage text={`Could not load game with id ${id}`} />
        )
    }

    return (
        <main id="gamePage">
            <figure className="gamePage-figure">
                <Image 
                    src={STORAGE_URL + game.cover}
                    unoptimized
                    className="gamePage-image"
                    alt="Game Cover"
                    width={100}
                    height={300}
                />

                <section className="game-heading">
                    <h2 className="game-released"> {convertDateToString(new Date(game.releaseDate))} </h2>
                    <h2 className="game-title"> {game.title} </h2>
                </section>
            </figure>

            <section className="game-content">
                <section className="game-overview">
                    <h1 className="overview-title">Overview</h1>

                    <p className="game-description">
                        {game.description}
                    </p>
                </section>

                <section className="game-metadata">
                    <ul className="metadata-list">
                        <FavouriteButton game={game} />

                        <li className="list-item">
                            <h3 className="item-heading"> COVER </h3>
                            <span className="item-text">
                                <Link 
                                    href={STORAGE_URL + game?.cover} 
                                    target="_blank" 
                                    className="item-text item-link" 
                                    title="Open cover in new tab"
                                >
                                    {game.cover}
                                </Link>
                            </span>
                            
                        </li>
                        
                        <li className="list-item">
                            <h3 className="item-heading"> RELEASE DATE </h3>
                            <h3 className="item-text published"> {convertDateToString(new Date(game.releaseDate))} </h3>
                        </li>
                                    
                        <li className="list-item">
                            <h3 className="item-heading"> MAX PLAYERS </h3>
                            <h3 className="item-text"> {game.players} </h3>
                        </li>

                        <li className="list-item">
                            <h3 className="item-heading"> GENRE </h3>
                            <h3 className="item-text"> {game.category} </h3>
                        </li>

                        <li className="list-item">
                            <h3 className="item-heading"> PUBLISHER </h3>
                            <h3 className="item-text"> {game.publisher} </h3>
                        </li>

                        <li className="list-item">
                            <h3 className="item-heading"> DEVELOPER </h3>
                            <h3 className="item-text"> {game.developer} </h3>
                        </li>

                        <PlayButton game={game} />
                    </ul>
                </section>
            </section>

            <div className="darken-image-bottom" />
        </main>
    )
}