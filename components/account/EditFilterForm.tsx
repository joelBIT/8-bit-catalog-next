import { ReactElement } from "react";
import { arima } from "@/fonts/fonts";

import "./EditFilterForm.css";

export function EditFilterForm( { categories, developers, publishers } : { categories: string[], developers: string[], publishers: string[] }): ReactElement {
    return (
        <form id="editFilterForm">
            <h2 className={`selectSection__title ${arima.className}`}> Category </h2>
            <div className="category-wrapper">
                <span className="material-symbols-outlined"> remove </span>
                <select name="categories" className="selectSection__select" defaultValue={categories[0]}>
                    {categories.map((element, index) => <option key={index} value={element}> {element} </option>)}
                </select>
                <span className="material-symbols-outlined"> add </span>
            </div>

            <h2 className={`selectSection__title ${arima.className}`}> Developer </h2>
            <div className="developer-wrapper">
                <span className="material-symbols-outlined"> remove </span>
                <select name="developers" className="selectSection__select" defaultValue={developers[0]}>
                    {developers.map((element, index) => <option key={index} value={element}> {element} </option>)}
                </select>
                <span className="material-symbols-outlined"> add </span>
            </div>

            <h2 className={`selectSection__title ${arima.className}`}> Publisher </h2>
            <div className="publisher-wrapper">
                <span className="material-symbols-outlined"> remove </span>
                <select name="publishers" className="selectSection__select" defaultValue={publishers[0]}>
                    {publishers.map((element, index) => <option key={index} value={element}> {element} </option>)}
                </select>
                <span className="material-symbols-outlined"> add </span>
            </div>
        </form>
    );
}