import { ReactElement } from "react";

/**
 * Loading page containing a loading spinner shown in the UI while page content is loading.
 */
export default function Loading(): ReactElement {
    return (
        <main id="loadingPage">
            <section className="loading-spinner">
                <section className="loading-spinner-inner">
                    <div>
                    </div>
                </section>
            </section>
        </main>
    );
}