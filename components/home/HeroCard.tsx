import { ReactElement } from "react";
import Link from "next/link";
import Image from 'next/image';
import { Game } from "@/types/types";
import { URL_GAME_DETAILS_PAGE } from "@/utils/utils";
import { singleDay } from "@/fonts/fonts";

import "./HeroCard.css";

export function HeroCard({ game }: { game: Game }): ReactElement {
    const STORAGE_URL = process.env.NEXT_PUBLIC_COVER;

    return (
        <section id="heroCard" className="pixel-corners">
            <Link href={`${URL_GAME_DETAILS_PAGE}/${game.id}`} className='heroCard__link'>

                <article className="heroCard-wrapper pixel-corners">
                    <Image 
                        src={STORAGE_URL + game.cover}
                        unoptimized
                        priority
                        className="heroCard__figure-cover"
                        alt="Random Game Cover"
                        width={768}
                        height={300}
                        title={game.title}
                    />
                </article>

                <h1 className={`heroCard__title ${singleDay.className}`}> {game.title} </h1>
            </Link>
        </section>
    );
}