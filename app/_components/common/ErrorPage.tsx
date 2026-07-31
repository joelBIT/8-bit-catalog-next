import { ReactElement } from "react";
import Link from "next/link";
import { URL_HOME } from "@/app/_utils/utils";

import "./ErrorPage.css";

/**
 * This error component is used within the application when the developer wants full control over when to show this page.
 */
export default function ErrorPage({text}: {text: string}): ReactElement {
    return (
        <main id="errorPage">
            <h2 className="errorPage-text"> {text} </h2>
            <Link href={URL_HOME} className='home-link'> Return Home </Link>
        </main>
    );
}