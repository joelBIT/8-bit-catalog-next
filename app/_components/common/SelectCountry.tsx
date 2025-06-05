'use client';

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { arima } from "@/app/_fonts/fonts";

import "./SelectCountry.css";

/**
 * A Select list containing various countries and their flags.
 */
export function SelectCountry(): ReactElement {
    const [ countries, setCountries ] = useState<{"value": string, "label": string}[]>([]);
    const [ selectedCountry, setSelectedCountry ] = useState<{"value": string, "label": string}>({value: "SE", label: "🇸🇪 Sweden"});

    useEffect(() => {
        fetch(
            "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
        )
        .then((response) => response.json())
        .then((data) => {
            data.countries.sort((a: { label: string; }, b: { label: string; }) => a.label.substring(4).localeCompare(b.label.substring(4)));
            setCountries(data.countries);
            setSelectedCountry(data.userSelectValue);
        });
    }, []);

    /**
     * Update selected country.
     */
    function selectCountry(event: ChangeEvent<HTMLSelectElement>): void {
        const country = countries.find(country => country.value === event.target.value);
        if (country) {
            setSelectedCountry(country);
        }
    }

    return (
        <section className="information-input">
            <label className="input-label">
                Country or Region
            </label>

            <select 
                id="selectCountry" 
                name="country" 
                value={selectedCountry.value} 
                onChange={selectCountry} 
                className={`${arima.className} input-field`}
            >
                
            { 
                countries.length > 0 ?
                <>
                    <option value={selectedCountry.value} key="DEFAULT"> {selectedCountry.label} </option>
                    {countries.map(country => <option value={country.value} key={country.value}> {country.label} </option>)}
                </>
                    :
                    <></>
            }
            </select>
        </section>
    );
}