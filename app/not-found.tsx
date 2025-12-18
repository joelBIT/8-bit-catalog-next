import { ReactElement } from 'react';
import Link from 'next/link';
import { URL_HOME } from '@/app/_utils/utils';

export default function NotFoundPage(): ReactElement {
    return (
        <main id="notFoundPage">
            <h2 className='not-found__title'> Not Found </h2>
            <p className='not-found__text'> Could not find the requested resource </p>
            <Link href={URL_HOME} className='not-found__link' as={URL_HOME} prefetch={false}> Return Home </Link>
        </main>
    )
}