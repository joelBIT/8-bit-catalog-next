import { ReactElement, useContext } from "react";
import { Game } from "@/interfaces/interfaces";
import { FavouritesContext } from "@/contexts/FavouritesContextProvider";
import styles from "./favouriteButton.module.css";

export function FavouriteButton({ game }: { game: Game }): ReactElement {
    const {favouritesList, setFavouritesList} = useContext(FavouritesContext);
    const isFavorite = favouritesList.some((favourite: { id: number; }) => favourite.id === game.id);

    /**
     * Adds or removes a game from the list of favourites. The event is prevented so
     * that a user is not redirected to the game details page when clicking on the favourite button.
     */
    function handleFavourites(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();

        if (isFavorite) {
            setFavouritesList(favouritesList.filter((favourite: { id: number; }) => favourite.id !== game.id));
        } else {
            setFavouritesList([...favouritesList, game]);
        }
    }
    
    return (
        <button 
            className={ isFavorite ? `${styles.favouriteButton} ${styles.isFavourite}` : `${styles.favouriteButton} ${styles.noFavourite}` } 
            onClick={(event) => handleFavourites(event)}>
        </button>
    );
}