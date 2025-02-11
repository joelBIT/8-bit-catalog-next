import { ReactElement } from "react";
import Form from 'next/form';
import { getAllDevelopers, getAllPublishers } from "@/db/db";
import { addAllOption, getCategories } from "@/utils/utils";
import { SearchFilter } from "@/types/types";
import { arima, rancho } from "@/fonts/fonts";
import { Search } from "@/components/search/Search";

import "./page.css";

export default async function SearchPage({ searchParams } : { searchParams: Promise<SearchFilter> }): Promise<ReactElement<ReactElement>> {
    const params = await searchParams;
    const title = params.title || '';
    const category = params.category;
    const developer = params.developer;
    const publisher = params.publisher;

    return (
        <main id="searchPage">
            <section id="searchFilters">
                <h1 className={`searchFilters__title ${rancho.className}`}> Search Games </h1>
                <Form id="searchFilters__form" action="" scroll={false}>
                    <article className="searchFilters__filters">

                        <section className="selectSection">
                            <h2 className={`selectSection__title ${arima.className}`}>{'Category'}</h2>
                            <select className="selectSection__select" name="category" defaultValue={category}>
                                {getCategories().map((element, index) => <option key={index} value={element}>{element}</option>)}
                            </select>
                        </section>

                        <section className="selectSection">
                            <h2 className={`selectSection__title ${arima.className}`}>{'Publisher'}</h2>
                            <select className="selectSection__select" name="publisher" defaultValue={publisher}>
                                {addAllOption(await getAllPublishers()).map((element, index) => <option key={index} value={element}>{element}</option>)}
                            </select>
                        </section>

                        <section className="selectSection">
                            <h2 className={`selectSection__title ${arima.className}`}>{'Developer'}</h2>
                            <select className="selectSection__select" name="developer" defaultValue={developer}>
                                {addAllOption(await getAllDevelopers()).map((element, index) => <option key={index} value={element}>{element}</option>)}
                            </select>
                        </section>

                    </article>

                    <article id="searchInput">
                        <input 
                            id="searchTitle"
                            name="title"
                            className={arima.className} 
                            type="text"
                            placeholder="Game Title"
                        />

                        <button className={`gameButton ${arima.className}`}> Search </button>
                    </article>
                </Form>
            </section>
            
            <Search searchParams={{ title, category, developer, publisher }} />
        </main>
    );
}