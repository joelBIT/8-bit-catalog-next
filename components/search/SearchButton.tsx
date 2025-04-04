'use client';

import { ReactElement } from 'react';
import { useFormStatus } from 'react-dom';
import { arima } from '@/fonts/fonts';
 
export function SearchButton(): ReactElement<ReactElement> {
  const status = useFormStatus();

  return (
    <button type="submit" className={`gameButton ${arima.className}`} disabled={status.pending}> 
        Search
    </button>
  )
}