import { ReactElement } from "react";
import Link from "next/link";
import { ContactForm } from "@/app/_components/common";

import "./page.css";

/**
 * This page contains contact information.
 */
export default function ContactPage(): ReactElement {

    const CONTACT = [
        {icon: 'mail', title: 'Email', text: 'contact@joel-rollny.eu', link: 'mailto:contact@joel-rollny.eu'},
        {icon: 'location_on', title: 'Location', text: 'Karlstad, Sweden', link: 'https://maps.app.goo.gl/gDzYq4uLUqTVSyV8A'},
        {icon: 'globe', title: 'Website', text: 'http://www.joel-rollny.eu', link: 'http://www.joel-rollny.eu'}
    ]

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

                    {CONTACT.map(contact => <ContactCard icon={contact.icon} title={contact.title} text={contact.text} link={contact.link} />)}
                </section>

                <section className="contact-form">
                    <ContactForm />
                </section>
            </section>
            <div className="darken-image-bottom" />
        </main>
    );

    function ContactCard({icon, title, text, link}: {icon: string, title: string, text: string, link: string}): ReactElement {
        return (
            <section className="contactCard">
                <section className="contact-icon material-symbols-outlined">{icon}</section>
                
                <section className="contact-info">
                    <h2 className="contact-info__heading"> {title} </h2>
                    <p className="contact-info__text"> {text} </p>
                </section>

                <Link className="contact-link" target="_blank" href={link}>
                    <span className="material-symbols-outlined"> open_in_new </span>
                </Link> 
            </section>
        );
    }
}