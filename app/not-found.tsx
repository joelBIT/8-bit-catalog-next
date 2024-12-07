import Link from 'next/link';

import "./not-found.css";
 
export default function NotFoundPage() {
    return (
        <main id="notFoundPage">
            <h2 className='not-found__title'>Not Found</h2>
            <p className='not-found__text'>Could not find requested resource</p>
            <Link href="/">Return Home</Link>
        </main>
    )
}