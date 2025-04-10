'use client';

import { ReactElement } from 'react';
import { useFormStatus } from 'react-dom';
import { arima } from '@/fonts/fonts';

import "./SearchButton.css";
 
export function SearchButton(): ReactElement {
  const status = useFormStatus();

  return (
    <button id="searchButton" type="submit" className={`gameButton ${arima.className}`} disabled={status.pending}> 
        Search
    </button>
  )
}