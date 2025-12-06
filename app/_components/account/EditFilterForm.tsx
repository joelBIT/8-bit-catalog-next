'use client';

import { ReactElement, useRef, useState } from "react";
import { EditFilterModal } from "../common";
import { Filter } from "@/app/_types/types";
import { updateFilterValues } from "@/app/_client/client";

import "./EditFilterForm.css";

/**
 * Update the values of a search filter. The 'filter' input corresponds to the name of the column in the database filter table that is going
 * to be updated. The 'filterValues' input corresponds to the currently existing values of the search filter.
 * The 'filterValues' input is retrieved directly from the database since this is an admin page for modifying filter values, and the updates
 * are stored in the database.
 */
export function EditFilterForm( { title, filterValues, filter } : { title: string, filterValues: string[], filter: Filter }): ReactElement {
    const [valuesList, setValuesList] = useState<string[]>(filterValues);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const selectRef = useRef<HTMLSelectElement>(null);

    function confirmUpdate(value: string): void {
        if (!valuesList.includes(value)) {      // Only add value if it does not already exists
            const values = [...valuesList, value].sort();
            updateFilterValues(values, filter);
            setValuesList(values);
        }
        
        setOpenModal(false);
    }
    
    return (
        <section id="editFilterForm" className="selectSection">
            <h2 className="selectSection__title"> {title} <span className="material-symbols-outlined" onClick={() => setOpenModal(true)}> edit </span> </h2>
            <div className="filter-wrapper">
                <select name="values" className="selectSection__select" defaultValue={valuesList[0]} ref={selectRef}>
                    {valuesList.map(element => <option key={element} value={element}> {element} </option>)}
                </select>
            </div>

            { 
                openModal ? 
                    <EditFilterModal 
                        filterValue={selectRef.current?.value as string} 
                        confirm={confirmUpdate} 
                        close={() => setOpenModal(false)} 
                    />
                : <></>
            }
        </section>
    );
}