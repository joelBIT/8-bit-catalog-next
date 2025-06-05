import { ReactElement } from "react";
import Link from "next/link";

import "./page.css";

/**
 * Page for resetting a forgotten account password.
 */
export default function ForgotPage(): ReactElement {
    return (
        <main id="forgotPage">
            <section id="forgotPage-modal">
                <section id="forgotPage-modal-back">
                    <Link href={"/"} className="forgotPage-link"> 
                        <span className="material-symbols-outlined"> arrow_back </span> 
                        <h2 className="forgotPage-link__text"> Back to catalog </h2> 
                    </Link>
                </section>

                <section id="forgotPage-form">
                    
                </section>
            </section>
        </main>
    );
}