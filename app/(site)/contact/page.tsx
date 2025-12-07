import { ReactElement } from "react";
import { ContactForm } from "@/app/_components/common";

import "./page.css";

/**
 * This page contains contact information as well as a contact form where users can make inquiries or give feedback.
 */
export default function ContactPage(): ReactElement {

    return (
        <main id="contactPage">
            <img src="/karlstadcontact.avif" className="contact-image" />
            <h1 id="contactPage-title">
                Get in touch
            </h1>

            <section id="contactPage-information">
                <p id="information-text">
                    Send a message if you have any questions or wishes about the 8-bit catalog. I will get back to
                    you as soon as possible. Use the form to send me a direct message.
                    Otherwise use the contact information below.
                </p>

                <h2 className="contact-info__heading"> Contact Information </h2>

                <article id="contact-info">
                    <section className="contact__info" title="Location">
                        <article className="contact__info-title">
                            <span className={`material-symbols-outlined location`}> location_on </span>
                            <h2 className="contact__info-title-text"> Location </h2>
                        </article>

                        <p>Karlstad, Sweden</p>
                    </section>

                    <section className="contact__info">
                        <article className="contact__info-title">
                            <span className={`material-symbols-outlined mail`} title="Email"> mail </span>
                            <h2 className="contact__info-title-text"> Email </h2>
                        </article>

                        <a href="mailto:contact@joel-rollny.eu"> contact@joel-rollny.eu </a>
                    </section>

                    <section className="contact__info">
                        <article className="contact__info-title">
                            <span className={`material-symbols-outlined globe`} title="Website"> globe </span> 
                            <h2 className="contact__info-title-text"> Website </h2>
                        </article>

                        <a href="https://www.joel-rollny.eu" target="_blank" className="contact__link"> www.joel-rollny.eu</a>
                    </section>

                    <section className="contact__info">
                        <article className="contact__info-title">
                            <img src="/linkedin.svg" title="LinkedIn" />
                            <h2 className="contact__info-title-text"> LinkedIn </h2>
                        </article>

                        <a href="https://www.linkedin.com/in/joel-rollny-1b517330a/" target="_blank" className="contact__link"> Joel Rollny </a>
                    </section>
                </article>
            </section>
            
            <ContactForm />
        </main>
    );
}