import { ReactElement } from "react";
import { ContactForm } from "@/app/_components/common";

import "./page.css";

/**
 * This page contains contact information as well as a contact form where users can make inquiries or give feedback.
 */
export default function ContactPage(): ReactElement {

    return (
        <main id="contactPage">
            <img id="contact-image" src="/karlstad.png" alt="Photography of Karlstad from above" />

            <section id="contactPage-content">
                <section id="contactPage-information">
                    <h1 id="contactPage-title">
                        Get in touch
                    </h1>

                    <p id="information-text">
                        Send a message if you have any questions or wishes about the 8-bit catalog. I will get back to
                        you as soon as possible.
                    </p>
                </section>
                
                <ContactForm />
            </section>
        </main>
    );
}


/**
                    <h4 className="contact__info">
                        <span className={`material-symbols-outlined mail`}> mail </span>
                        <a href="mailto:joel.rollny@gmail.com" className="contact__link"> joel.rollny@gmail.com</a>
                    </h4>
                    <h4 className="contact__info">
                        <span className={`material-symbols-outlined globe`}> globe </span> 
                        <a href="https://www.joel-rollny.eu" target="_blank" className="contact__link"> www.joel-rollny.eu</a>
                    </h4>
                    <h4 className="contact__info">
                        <span className={`material-symbols-outlined location`}> location_on </span> Karlstad, Sweden
                    </h4>
 */