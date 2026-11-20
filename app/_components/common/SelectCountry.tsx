'use client';

import { ReactElement, useState } from "react";
import { Country } from "@/app/_types/types";
import countryData from "@/app/_db/countries.json"; 

import "./SelectCountry.css";

// Sorted once when the module loads. The label starts with a flag emoji (4 UTF-16 code units), so skip it when sorting.
const COUNTRIES: Country[] = [...(countryData.countries as Country[])]
    .sort((a, b) => a.label.substring(4).trim().localeCompare(b.label.substring(4).trim()));

/**
 * A Select list containing various countries and their flags. The 'selected' parameter corresponds to the chosen initial country.
 */
export function SelectCountry({ selected }: { selected: string }): ReactElement {
    const [country, setCountry] = useState<string>(selected);

    return (
        <section id="selectCountry" className="information-input">
            <label className="input-label" htmlFor="country">
                Country or Region
            </label>

            <select
                id="country"
                name="country"
                value={country}
                onChange={event => setCountry(event.target.value)}
                autoComplete="country"
                className="input-field"
            >
                {COUNTRIES.map(({ value, label }) => (
                    <option value={value} key={value}> {label} </option>
                ))}
            </select>
        </section>
    );
}