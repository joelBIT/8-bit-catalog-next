import { ReactElement } from "react";

import "./page.css";

/**
 * This page contains contact information.
 */
export default function ContactPage(): ReactElement {

    return (
        <main id="contactPage">
            <section id="contact-presentation">
                <article id="contact-heading">
                    <h1 id="contactPage-title">
                        Contact
                    </h1>

                    <p id="information-text">
                        Please contact me if you have any questions or wishes about the 8-bit catalog. I will get back to
                        you as soon as possible.
                    </p>
                </article>

                <figure className="contact-figure">
                    <img src="/contact.png" alt="Contact Image" className="contact-image" />
                </figure>
            </section>

        

            <section id="contactPage-information">
                <article id="contact-info">
                    <section className="contact__info">
                        <section className="contact__info-top">
                            <img src="/location.svg" className="contact__info-icon" />
                            <h2 className="contact__info-heading"> Location </h2>
                        </section>

                        <p className="contact__info-text">I reside in Karlstad, Sweden.</p>
                    </section>

                    <section className="contact__info">
                        <section className="contact__info-top">
                            <img src="/email.svg" className="contact__info-icon" />
                            <h2 className="contact__info-heading"> Email </h2>
                        </section>

                        <p className="contact__info-text">
                            Please send an email to <a href="mailto:contact@joel-rollny.eu"> contact@joel-rollny.eu </a> for anything 
                            related to the 8-bit Catalog.
                        </p>
                    </section>

                    <section className="contact__info">
                        <section className="contact__info-top">
                            <img src="/website.svg" className="contact__info-icon" />
                            <h2 className="contact__info-heading"> Website </h2>
                        </section>
               
                        <p className="contact__info-text">
                            You can find contact information at <a href="https://www.joel-rollny.eu" target="_blank"> www.joel-rollny.eu</a>.
                            That site also contains a form that you can use to send me a direct message.
                        </p>
                    </section>
                </article>
            </section>
        </main>
    );
}