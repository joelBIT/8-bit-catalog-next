'use client';

import { ReactElement, useContext } from "react";
import { usePathname } from 'next/navigation'
import { Game } from "@/types/types";
import { FavouritesContext } from "@/contexts/FavouritesContextProvider";

import "./FavouriteButton.css";

export function FavouriteButton({ game, setFading }: { game: Game, setFading: (fading: boolean) => void }): ReactElement<ReactElement> {
    const pathname = usePathname();
    const { favouritesList, addFavouriteGame, removeFavouriteGame } = useContext(FavouritesContext);
    const isFavorite = favouritesList.some((favourite: { id: number; }) => favourite.id === game.id);

    /**
     * Adds or removes a game from the list of favourites. The event is prevented so
     * that a user is not redirected to the game details page when clicking on the favourite button.
     */
    function handleFavourites(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();

        if (isFavorite) {
            if (pathname === "/favourites") {           // If a game card is removed from favourites page, it fades out
                setFading(true);
                setTimeout(() => removeFavouriteGame(game), 400);
                setTimeout(() => setFading(false), 600);
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