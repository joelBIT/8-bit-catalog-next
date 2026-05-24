import { ReactElement } from "react";
import { ContactForm } from "@/app/_components/common";

import "./page.css";

/**
 * This page contains contact information.
 */
export default function ContactPage(): ReactElement {

    return (
        <main id="contactPage">
            <div className="contact-title">
                Contact
            </div>

            <section className="contact-content">
                <section className="contact-details">
                    <h2 className="contact-heading">Get in touch</h2>
                    <p className="contact-text">
                        Please contact me if you have any questions or wishes about the 8-bit catalog. 
                        I will get back to you as soon as possible.
                    </p>
                </section>

                <section className="contact-form">
                    <ContactForm />
                </section>
            </section>
            <div className="darken-image-bottom" />
        </main>
    );

    function ContactCard({icon, title, text}: {icon: string, title: string, text: string}): ReactElement {
        return (
            <section className="contactCard">

            </section>
        );
    }
}