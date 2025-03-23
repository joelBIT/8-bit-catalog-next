import Link from 'next/link';

import "./page.css";
 
export default function ForbiddenPage() {
    return (
        <main id="forbiddenPage">
            <h2 className='forbidden__title'>Forbidden</h2>
            <p className='forbidden__text'>The requested resource is not available for you.</p>
            <Link href="/">Return Home</Link>
        </main>
    )
}