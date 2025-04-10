'use client';

import { ReactElement, useRef, useState } from "react";
import { Modal } from "../common";
import { arima } from "@/fonts/fonts";

import "./EditFilterForm.css";

export function EditFilterForm( { title, filterValues } : { title: string, filterValues: string[] }): ReactElement {
    const [ valuesList, setValuesList ] = useState<string[]>(filterValues);
    const [ modalText, setModalText ] = useState<string>("Are you sure you want to delete the value?");
    const [ openModal, setOpenModal ] = useState<boolean>(false);
    const selectRef = useRef<HTMLSelectElement>(null);

    function confirmDelete() {
        
    }

    function open() {
        setModalText(`Are you sure you want to delete ${selectRef.current?.value}?`);
        setOpenModal(true);
    }

    function closeModal() {
        setOpenModal(false);
    }
    
    return (
        <section id="editFilterForm">
            <h2 className={`selectSection__title ${arima.className}`}> { title } </h2>
            <div className="filter-wrapper">
                <span className="material-symbols-outlined" onClick={open}> remove </span>
                <select name="values" className="selectSection__select" defaultValue={valuesList[0]} ref={selectRef}>
                    {valuesList.map(element => <option key={element} value={element}> {element} </option>)}
                </select>
                <span className="material-symbols-outlined"> add </span>
            </div>

            <Modal title={modalText} confirm={confirmDelete} open={openModal} close={closeModal} />
        </section>
    );
}