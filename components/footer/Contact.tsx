import { ReactElement } from "react";
import "./Contact.css";

export function Contact(): ReactElement {
    return (
        <section id="contact">
            <h2 className="contact__title">Contact</h2>
            <ul className="contact__list">
                <li>
                    <h4 className="contact__info">
                        <span className={`material-symbols-outlined mail`}>mail</span>
                        <a href="mailto:joel.rollny@gmail.com" className="contact__link">joel.rollny@gmail.com</a>
                    </h4>
                </li>
                <li>
                    <h4 className="contact__info">
                        <span className={`material-symbols-outlined globe`}>globe</span> 
                        <a href="http://www.joel-rollny.eu" target="_blank" className="contact__link">www.joel-rollny.eu</a>
                    </h4>
                </li>
                <li>
                    <h4 className="contact__info">
                        <span className={`material-symbols-outlined location`}>location_on</span> Karlstad, Sweden
                    </h4>
                </li>
            </ul>
        </section>
    );
}