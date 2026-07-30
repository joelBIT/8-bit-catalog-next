'use server';

import { ReactElement } from "react";
import Image from 'next/image';
import Link from "next/link";
import { convertDateToString, URL_HOME } from "@/app/_utils/utils";
import { getGameById } from "@/app/_db/games-db";
import { Game } from "@/app/_db/schema/games";

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
    } catch (error) {
        return (
            <main id="gamePage">
                <h2 className="gamePage-error"> Could not load game </h2>
                <Link href={URL_HOME} className='not-found__link'> Return Home </Link>
            </main>
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

            <div className="darken-image-bottom" />
        </main>
    )
}