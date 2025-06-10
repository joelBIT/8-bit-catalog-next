'use client';

import { ReactElement } from 'react';
import { useFormStatus } from 'react-dom';
import { arima } from '@/app/_fonts/fonts';
 
export function SearchButton(): ReactElement {
    const status = useFormStatus();

    return (
        <button 
            id="searchButton" 
            type="submit" 
            className={`button__link ${arima.className}`} 
            disabled={status.pending}
        > 
            Search
        </button>
    )
}