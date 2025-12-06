'use client';

import { ReactElement, useRef, useState } from "react";
import { InputModal } from "../common";
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
    const [modalText, setModalText] = useState<string>("Are you sure you want to update the value?");
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

    function open(): void {
        setModalText(`Are you sure you want to update ${selectRef.current?.value}?`);
        setOpenModal(true);
    }
    
    return (
        <section id="editFilterForm" className="selectSection">
            <h2 className="selectSection__title"> {title} </h2>
            <div className="filter-wrapper">
                <select name="values" className="selectSection__select" defaultValue={valuesList[0]} ref={selectRef}>
                    {valuesList.map(element => <option key={element} value={element}> {element} </option>)}
                </select>
                <span className="material-symbols-outlined" onClick={open}> edit </span>
            </div>

            { 
                openModal ? 
                    <InputModal 
                        text={modalText} 
                        confirm={confirmUpdate} 
                        close={() => setOpenModal(false)} 
                    />
                : <></>
            }
        </section>
    );
}