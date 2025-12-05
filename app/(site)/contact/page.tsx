import { ReactElement } from "react";
import { ContactForm } from "@/app/_components/common";

import "./page.css";

/**
 * This page contains contact information as well as a contact form where users can make inquiries or give feedback.
 */
export default function ContactPage(): ReactElement {

    return (
        <main id="contactPage">
            <section id="contactPage-information">
                <h1 id="contactPage-title">
                    Get in touch
                </h1>

                <p id="information-text">
                    Send a message if you have any questions or wishes about the 8-bit catalog. I will get back to
                    you as soon as possible.
                </p>

                <article id="contact-info">
                    <section className="contact__info">
                        <span className={`material-symbols-outlined location`}> location_on </span> Karlstad, Sweden
                    </section>

                    <section className="contact__info">
                        <span className={`material-symbols-outlined mail`}> mail </span>
                        <a href="mailto:contact@joel-rollny.eu"> contact@joel-rollny.eu </a>
                    </section>

                    <section className="contact__info">
                        <span className={`material-symbols-outlined globe`}> globe </span> 
                        <a href="https://www.joel-rollny.eu" target="_blank" className="contact__link"> www.joel-rollny.eu</a>
                    </section>
                </article>
            </section>
            
            <h2 className="contact-form__heading"> Contact </h2>
            <ContactForm />
        </main>
    );
}