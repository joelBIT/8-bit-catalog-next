import { ReactElement } from "react";
import Form from 'next/form';
import { SearchFilter } from "@/app/_types/types";
import { Search, SearchButton } from "@/app/_components/search";
import { getAllCategories, getAllDevelopers, getAllPublishers } from "@/app/_db/db";
import { addAllOption } from "@/app/_utils/utils";

import "./page.css";

/**
 * The search params are used to get the desired search results/page.
 */
export default async function SearchPage({ searchParams } : { searchParams: Promise<SearchFilter> }): Promise<ReactElement> {
    const params = await searchParams;

    return (
        <main id="searchPage">
            <section id="searchPage-wrapper">
                <search id="searchFilters">
                    <h1 className="searchFilters__title"> Search Games </h1>
                    <Form id="searchFilters__form" action="" scroll={false}>
                        <article className="searchFilters__filters">
                            <section className="selectSection">
                                <h2 className="selectSection__title"> Category </h2>
                    
                                <select className="selectSection__select" name="category" defaultValue={params.category}>
                                    { addAllOption(await getAllCategories()).map((element, index) => <option key={index} value={element}> {element} </option>) }
                                </select>
                            </section>

                            <section className="selectSection">
                                <h2 className="selectSection__title"> Publisher </h2>
                    
                                <select className="selectSection__select" name="publisher" defaultValue={params.publisher}>
                                    { addAllOption(await getAllPublishers()).map((element, index) => <option key={index} value={element}> {element} </option>) }
                                </select>
                            </section>
                            
                            <section className="selectSection">
                                <h2 className="selectSection__title"> Developer </h2>
                    
                                <select className="selectSection__select" name="developer" defaultValue={params.developer}>
                                    { addAllOption(await getAllDevelopers()).map((element, index) => <option key={index} value={element}> {element} </option>) }
                                </select>
                            </section>
                        </article>

                        <search id="searchInput">
                            <section className="input-wrapper">
                                <span className="material-symbols-outlined"> search </span>
                                <input 
                                    id="searchTitle"
                                    name="title"
                                    type="text"
                                    placeholder="Game Title"
                                />
                            </section>

                            <SearchButton />
                        </search>
                    </Form>
                </search>
                <Search />
            </section>
        </main>
    );
}