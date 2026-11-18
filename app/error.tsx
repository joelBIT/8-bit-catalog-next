'use client';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <main id="errorPage">
            <h2 className="error-page__title"> Something went wrong </h2>
            <button type="button" className="authButton" onClick={reset}>
                <span className="authButton__text"> Try again </span>
            </button>
        </main>
    );
}