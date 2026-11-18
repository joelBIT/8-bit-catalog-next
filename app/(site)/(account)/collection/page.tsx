'use client';

import { ReactElement, useEffect, useState } from "react";
import { useCollection, useOptions } from "@/app/_hooks";
import { ScrollTopButton } from "@/app/_components/common";
import { Game } from "@/app/_db/schema/games";
import { SearchResultOptions } from "@/app/_components/search";
import { sortGames } from "@/app/_utils/utils";
import { GameCard } from "@/app/_components/games";
import { GameListEntry } from "@/app/_components/lists";

import "./page.css";

/**
 * Renders the current user's game collection as game cards either in Grid view or List view.
 */
export default function CollectionPage(): ReactElement {
    const { favouritesList, isLoading } = useCollection();
    const { sortOrder, gridView, numberGamesShowing } = useOptions();
    const dataKey = `${sortOrder}:${favouritesList.map(game => game.id).join(',')}`;        // Identifies "this data, sorted this way"
    const [collection, setCollection] = useState<Game[]>(() => sortGames(favouritesList, sortOrder));
    const [syncedKey, setSyncedKey] = useState<string>(dataKey);
    const isSynced = syncedKey === dataKey;
    
    useEffect(() => {
        setCollection(sortGames(favouritesList, sortOrder));
        setSyncedKey(dataKey);
    }, [favouritesList, sortOrder, dataKey]);

    if (collection.length < 1) {
        return (
            <main id="collectionPage">
                <CollectionHeading />

                {
                    isLoading || !isSynced
                        ? <p role="status" className="no-collection__text"> Loading collection... </p>
                        : <h1 className="no-collection__text"> Collection is empty </h1>
                }

                <div className="darken-image-bottom" />
            </main>
        );
    }

    return (
        <main id="collectionPage">
            <CollectionHeading />

            <SearchResultOptions searchResult={collection} setSortedGames={setCollection} />

            <section className={gridView ? "grid" : "list"}>
                {
                    collection.slice(0, numberGamesShowing).map(game =>
                        gridView ? <GameCard key={game.id} game={game} /> : <GameListEntry key={game.id} game={game} />
                    )
                }
            </section>

            <ScrollTopButton />
            <div className="darken-image-bottom" />
        </main>
    );
}

function CollectionHeading(): ReactElement {
    return (
        <section className="collection-heading">
            <div className="collection-title">
                Game Collection
            </div>

            <p className="collection-text">
                Build your collection of games
            </p>
        </section>
    );
}