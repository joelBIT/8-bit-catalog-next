'use client';

import { ReactElement, useEffect, useState } from "react";

import "./ScrollTopButton.css";

/**
 * This component only appear on screen after a certain y position and when scrolling upwards. When a user clicks on this
 * component the window scrolls to top.
 */
export function ScrollTopButton(): ReactElement {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    let position = 0;

    useEffect(() => {
        window.addEventListener("scroll", scroll, false);

        return () => {
            window.removeEventListener("scroll", scroll, false);
        };
    }, []);

    function scroll(): void {
        if ((position > 1500) && !isVisible && (window.scrollY < position)) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
        
        position = window.scrollY;
    }

    function scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <>
            {
                isVisible ?
                    <section id="scrollTopButton-wrapper" onClick={scrollToTop}>
                        <span className="material-symbols-outlined"> keyboard_arrow_up </span>
                    </section>
                    : <></>

            }
        </>
    );
}