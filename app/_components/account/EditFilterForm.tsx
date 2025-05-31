'use client';

import { ReactElement, useRef, useState } from "react";
import { InputModal, Modal } from "../common";
import { arima } from "@/app/_fonts/fonts";
import { updateFilterValues } from "@/app/_client/client";

import "./EditFilterForm.css";

/**
 * Update the values of a search filter. The 'filter' input corresponds to the name of the column in the database filter table that is going
 * to be updated. The 'filterValues' input corresponds to the currently existing values of the search filter.
 * The 'filterValues' input is retrieved directly from the database since this is an admin page for modifying filter values, and the updates
 * are stored in the database.
 */
export function EditFilterForm( { title, filterValues, filter } : { title: string, filterValues: string[], filter: string }): ReactElement {
    const [ valuesList, setValuesList ] = useState<string[]>(filterValues);
    const [ modalText, setModalText ] = useState<string>("Are you sure you want to delete the value?");
    const [ inputModalText, setInputModalText ] = useState<string>("Add filter value");
    const [ openModal, setOpenModal ] = useState<boolean>(false);
    const [ openInputModal, setOpenInputModal ] = useState<boolean>(false);
    const selectRef = useRef<HTMLSelectElement>(null);

    function confirmDelete(): void {
        const remainingValues = valuesList.filter(value => value !== selectRef.current?.value);
        updateFilterValues(remainingValues, filter);
        setValuesList(remainingValues);
        setOpenModal(false);
    }

    function confirmUpdate(value: string): void {
        if (!valuesList.includes(value)) {      // Only add value if it does not already exists
            const values = [...valuesList, value].sort();
            updateFilterValues(values, filter);
            setValuesList(values);
        }
        
        setOpenInputModal(false);
    }

    function open(): void {
        setModalText(`Are you sure you want to delete ${selectRef.current?.value}?`);
        setOpenModal(true);
    }

    function inputOpen(): void {
        setInputModalText(`Add ${title}`);
        setOpenInputModal(true);
    }
    
    return (
        <section id="editFilterForm">
            <h2 className={`selectSection__title ${arima.className}`}> {title} </h2>
            <div className="filter-wrapper">
                <span className="material-symbols-outlined" onClick={open}> remove </span>
                <select name="values" className="selectSection__select" defaultValue={valuesList[0]} ref={selectRef}>
                    {valuesList.map(element => <option key={element} value={element}> {element} </option>)}
                </select>
                <span className="material-symbols-outlined" onClick={inputOpen}> add </span>
            </div>

            { 
                openModal ? <Modal 
                                text={modalText} 
                                confirm={confirmDelete} 
                                close={() => setOpenModal(false)} 
                            />
                : <></>
            }

            { 
                openInputModal ? <InputModal 
                                    text={inputModalText} 
                                    confirm={confirmUpdate} 
                                    close={() => setOpenInputModal(false)} 
                                />
                : <></>
            }

                        {/* <EditGameForm game={await getGameById(id)} filterValues={await getFilterValues()} /> */}
        </section>
    );
}