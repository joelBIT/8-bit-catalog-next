import { ReactElement } from "react";
import Form from 'next/form';
import { SearchFilter } from "@/types/types";
import { arima, rancho } from "@/fonts/fonts";
import { CategoryFilter, DeveloperFilter, PublisherFilter, Search, SearchButton } from "@/components/search";

import "./page.css";

/**
 * The search params are used to get the desired search results/page.
 */
export default async function SearchPage({ searchParams } : { searchParams: Promise<SearchFilter> }): Promise<ReactElement> {
    const params = await searchParams;

    return (
        <main id="searchPage">
            <section id="searchFilters">
                <h1 className={`searchFilters__title ${rancho.className}`}> Search Games </h1>
                <Form id="searchFilters__form" action="" scroll={false}>
                    <article className="searchFilters__filters">
                        <CategoryFilter defaultValue={params.category} />
                        <PublisherFilter defaultValue={params.publisher} />
                        <DeveloperFilter defaultValue={params.developer} />
                    </article>

                    <article id="searchInput">
                        <input 
                            id="searchTitle"
                            name="title"
                            className={arima.className} 
                            type="text"
                            placeholder="Game Title"
                        />

                        <SearchButton />
                    </article>
                </Form>
            </section>
            
            <Search />
        </main>
    );
}