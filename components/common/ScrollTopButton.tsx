import { ReactElement } from "react";

import "./ScrollTopButton.css";

export function ScrollTopButton(): ReactElement {

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <section id="scrollTopButton-wrapper" onClick={scrollToTop}>
            <span className="material-symbols-outlined"> keyboard_arrow_up </span>
        </section>
    );
}