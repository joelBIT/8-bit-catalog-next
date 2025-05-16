import { ReactElement } from 'react';
import Link from 'next/link';
import { URL_HOME } from '@/utils/utils';

import "./not-found.css";
 
export default function NotFoundPage(): ReactElement {
    return (
        <main id="notFoundPage">
            <h2 className='not-found__title'> Not Found </h2>
            <p className='not-found__text'> Could not find the requested resource </p>
            <Link href={URL_HOME}> Return Home </Link>
        </main>
    )
}