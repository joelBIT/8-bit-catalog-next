'use client';

import { ReactElement, useEffect, useState } from "react";
import { useFavourites } from "@/app/_hooks";
import { ScrollTopButton } from "@/app/_components/common";
import { Game } from "@/app/_db/schema/games";
import { SearchResultOptions } from "@/app/_components/search/SearchResultOptions";

import "./page.css";

/**
 * Renders the current user's game collection as game cards either in Grid view or List view.
 */
export default function CollectionPage(): ReactElement {
    const { favouritesList } = useFavourites();
    const [collection, setCollection] = useState<Game[]>(favouritesList);

    useEffect(() => {
        setCollection(favouritesList);
    }, [favouritesList])

    if (collection.length < 1) {
        return (
            <main id="collectionPage">
                <CollectionHeading />

                <h1 className="no-collection__text"> Collection is empty </h1>
                <div className="darken-image-bottom" />
            </main>
        );
    }

    return (
        <main id="collectionPage">
            <CollectionHeading />

            <SearchResultOptions searchResult={collection} setSortedGames={setCollection} />

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