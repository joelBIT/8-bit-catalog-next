'use client';

import { ReactElement } from "react";
import { useCollection } from "@/app/_hooks";
import { Game } from "@/app/_db/schema/games";

import "./FavouriteButton.css";

export function FavouriteButton({game}: {game: Game}): ReactElement {
    const { addFavouriteGame, removeFavouriteGame, isFavourite } = useCollection();
    const favourite = isFavourite(game.id);

    if (favourite) {
        return (
            <section className="favouriteButton" onClick={() => removeFavouriteGame(game)}>
                <span className="material-symbols-outlined">do_not_disturb_on</span>
                <span className="button-text">Remove from collection</span>
            </section>
        );
    }

    return (
        <section className="favouriteButton" onClick={() => addFavouriteGame(game)}>
            <span className="material-symbols-outlined">add_circle</span>
            <span className="button-text">Add to collection</span>
        </section>
    );
}