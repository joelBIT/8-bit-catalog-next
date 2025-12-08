'use client';

import { ReactElement } from 'react';
import { useFormStatus } from 'react-dom';
 
export function SearchButton(): ReactElement {
    const status = useFormStatus();

    return (
        <button 
            id="searchButton" 
            type="submit" 
            className="arrowButton"
            disabled={status.pending}
        > 
            <h2>Search</h2>
            <img src="/arrow-right-bg.png" />
        </button>
    )
}