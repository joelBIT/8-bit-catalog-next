import { ReactElement } from "react";
import Link from "next/link";
import Image from 'next/image';
import { Game } from "@/types/types";
import { URL_GAME_DETAILS_PAGE } from "@/utils/utils";
import { silkScreen, singleDay } from "@/fonts/fonts";

import "./HeroCard.css";

export function HeroCard({ game }: { game: Game }): ReactElement {
    return (
        <section id="heroCard">
            <article className="heroCard-wrapper">
                <h1 className={`heroCard__title ${silkScreen.className}`}> {game.title} </h1>
                
                <Link 
                    href={`${URL_GAME_DETAILS_PAGE}/${game.id}`} 
                    className={`heroCard__link ${singleDay.className}`}
                >
                    View Game
                </Link>
            </article>
            
            <figure className="heroCard__figure">
                <Image 
                    src={game.imageLink}
                    className="heroCard__figure-cover"
                    alt="Random Game Cover"
                    width={100}
                    height={300}
                />
            </figure>
        </section>
    );
}