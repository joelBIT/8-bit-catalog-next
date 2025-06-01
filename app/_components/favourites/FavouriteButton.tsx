'use client';

import { ReactElement, useContext } from "react";
import { usePathname } from 'next/navigation'
import { Game } from "@/app/_types/types";
import { FavouritesContext } from "@/app/_contexts/FavouriteContextProvider";
import { URL_FAVOURITES_PAGE } from "@/app/_utils/utils";

import "./FavouriteButton.css";

export function FavouriteButton({ game, setFading, removeCard }: { game: Game, setFading: (fading: boolean) => void, removeCard: (remove: boolean) => void }): ReactElement {
    const { favouritesList, addFavouriteGame, removeFavouriteGame } = useContext(FavouritesContext);
    const isFavorite = favouritesList.some((favourite: { id: number; }) => favourite.id === game.id);
    const pathname = usePathname();

    /**
     * Adds or removes a game from the list of favourites. The event is prevented so
     * that a user is not redirected to the game details page when clicking on the favourite button.
     */
    function handleFavourites(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        event.stopPropagation();

        if (isFavorite) {
            if (pathname === URL_FAVOURITES_PAGE) {           // If a game card is removed from favourites page, it fades out
                setFading(true);
                setTimeout(() => removeFavouriteGame(game), 300);
                setTimeout(() => { removeCard(true) }, 500);
            } else {
                removeFavouriteGame(game);
            }
        } else {
            addFavouriteGame(game);
        }
    }
    
    return (
        <button 
            className={ isFavorite ? `favouriteButton isFavourite` : `favouriteButton noFavourite` } 
            onClick={(event) => handleFavourites(event)}>
        </button>
    );
}