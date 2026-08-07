'use client';

import { ReactElement } from "react";
import Image from "next/image";
import Form from 'next/form';
import { useSearchParams } from "next/navigation";
import { useOptions } from "@/app/_hooks";
import { Search, SearchButton } from "@/app/_components/search";
import { addAllOption, URL_SEARCH_PAGE } from "@/app/_utils/utils";

import "./page.css";

/**
 * The search params are used to get the desired search results/page.
 */
export default function SearchPage(): ReactElement {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const title = params.get('title') || '';
    const category = params.get('category') as string;
    const developer = params.get('developer') as string;
    const publisher = params.get('publisher') as string;
    const { filterValues } = useOptions();

    return (
        <main id="searchPage">
            <figure id="search-figure">
                <Image 
                    src={URL_SEARCH_PAGE + "/nes-game-cartridges-hero.avif"}
                    className="search-image" 
                    alt="Search image" 
                    width={1232} 
                    height={480} 
                    loading="eager" 
                    placeholder="blur"
                    blurDataURL={URL_SEARCH_PAGE + "/nes-game-cartridges-hero.avif"}
                />

                <section className="searchPage-heading">
                    <h1 className="searchPage-title">SEARCH THE GAMES DATABASE</h1>
                    <p className="searchPage-text">The 8-bit Catalog provides metadata for all NES games.</p>
                </section>

                <Form id="searchFilters__form" action="" scroll={false}>
                    <search id="searchInput">
                        <section className="input-wrapper">
                            <span className="material-symbols-outlined"> search </span>
                            <input 
                                id="searchTitle"
                                name="title"
                                type="text"
                                placeholder={(title && title.length > 0) ? title : "Game Title"}
                            />
                        </section>

                        <SearchButton />
                    </search>

                    <article className="searchFilters__filters">
                        <section className="selectSection">
                            <h2 className="selectSection__title"> Category </h2>
                
                            <select className="selectSection__select" name="category" defaultValue={category}>
                                { addAllOption(filterValues.categories).map((element, index) => <option key={index} value={element}> {element} </option>) }
                            </select>
                        </section>

                        <section className="selectSection">
                            <h2 className="selectSection__title"> Publisher </h2>
                
                            <select className="selectSection__select" name="publisher" defaultValue={publisher}>
                                { addAllOption(filterValues.publishers).map((element, index) => <option key={index} value={element}> {element} </option>) }
                            </select>
                        </section>
                        
                        <section className="selectSection">
                            <h2 className="selectSection__title"> Developer </h2>
                
                            <select className="selectSection__select" name="developer" defaultValue={developer}>
                                { addAllOption(filterValues.developers).map((element, index) => <option key={index} value={element}> {element} </option>) }
                            </select>
                        </section>
                    </article>
                </Form>
            </figure>

            <Search params={{ title, category, publisher, developer }} />

            <div className="darken-image-bottom" />
        </main>
    );
}