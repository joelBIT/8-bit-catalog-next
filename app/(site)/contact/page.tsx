import { ReactElement } from "react";
import Image from "next/image";

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
                    <Image 
                        src="/contact/contact.png" 
                        alt="Contact Image" 
                        className="contact-image" 
                        width={600} 
                        height={626}
                        loading="eager"
                        placeholder="blur"
                        blurDataURL="/contact/contact.png" 
                    />
                </figure>
            </section>

            <section id="contactPage-information">
                <section className="contact__info">
                    <figure className="contact__info-figure">
                        <img src="/contact/location.png" className="contact__info-image" alt="Location Contact Image" />
                    </figure>

                    <section className="contact__info-right">
                        <h2 className="contact__info-heading"> Location </h2>
                        <p className="contact__info-text">I reside in Karlstad, Sweden. Visit me if you are in the neighborhood.</p>
                    </section>
                </section>

                <section className="contact__info">
                    <figure className="contact__info-figure">
                        <img src="/contact/email.jpeg" className="contact__info-image" alt="Email Contact Image" />
                    </figure>

                    <section className="contact__info-right">
                        <h2 className="contact__info-heading"> Email </h2>
                        <p className="contact__info-text">
                            Please send an email to <a href="mailto:contact@joel-rollny.eu"> contact@joel-rollny.eu </a> for anything 
                            related to the 8-bit Catalog.
                        </p>
                    </section>
                </section>

                <section className="contact__info">
                    <figure className="contact__info-figure">
                        <img src="/contact/website.jpeg" className="contact__info-image" alt="Website Contact Image" />
                    </figure>

                    <section className="contact__info-right">
                        <h2 className="contact__info-heading"> Website </h2>
                        <p className="contact__info-text">
                            You can find contact information at <a href="https://www.joel-rollny.eu" target="_blank"> www.joel-rollny.eu</a>.
                            That site also contains a form that you can use to send me a direct message.
                        </p>
                    </section>
                </section>
            </section>
        </main>
    );
}