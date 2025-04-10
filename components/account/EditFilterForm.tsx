'use client';

import { ReactElement, useRef, useState } from "react";
import { InputModal, Modal } from "../common";
import { arima } from "@/fonts/fonts";
import { updateFilterValues } from "@/data/data";

import "./EditFilterForm.css";

/**
 * Update the values of a search filter. The 'filter' input corresponds to the name of the column in the database filter table that is going
 * to be updated. The 'filterValues' input corresponds to the currently existing values of the search filter.
 */
export function EditFilterForm( { title, filterValues, filter } : { title: string, filterValues: string[], filter: string }): ReactElement {
    const [ valuesList, setValuesList ] = useState<string[]>(filterValues);
    const [ modalText, setModalText ] = useState<string>("Are you sure you want to delete the value?");
    const [ inputModalText, setInputModalText ] = useState<string>("Add filter value");
    const [ openModal, setOpenModal ] = useState<boolean>(false);
    const [ openInputModal, setOpenInputModal ] = useState<boolean>(false);
    const selectRef = useRef<HTMLSelectElement>(null);

    function confirmDelete() {
        const remainingValues = valuesList.filter(value => value !== selectRef.current?.value);
        updateFilterValues(remainingValues, filter);
        setValuesList(remainingValues);
        setOpenModal(false);
    }

    function confirmUpdate(value: string) {
        if (!valuesList.includes(value)) {      // Only add value if it does not already exists
            const values = [...valuesList, value].sort();
            updateFilterValues(values, filter);
            setValuesList(values);
        }
        
        setOpenInputModal(false);
    }

    function open() {
        setModalText(`Are you sure you want to delete ${selectRef.current?.value}?`);
        setOpenModal(true);
    }

    function inputOpen() {
        setInputModalText(`Add ${title}`);
        setOpenInputModal(true);
    }
    
    return (
        <section id="editFilterForm">
            <h2 className={`selectSection__title ${arima.className}`}> { title } </h2>
            <div className="filter-wrapper">
                <span className="material-symbols-outlined" onClick={open}> remove </span>
                <select name="values" className="selectSection__select" defaultValue={valuesList[0]} ref={selectRef}>
                    {valuesList.map(element => <option key={element} value={element}> {element} </option>)}
                </select>
                <span className="material-symbols-outlined" onClick={inputOpen}> add </span>
            </div>

            <Modal text={modalText} confirm={confirmDelete} open={openModal} close={() => setOpenModal(false)} />
            <InputModal text={inputModalText} confirm={confirmUpdate} open={openInputModal} close={() => setOpenInputModal(false)} />
        </section>
    );
}