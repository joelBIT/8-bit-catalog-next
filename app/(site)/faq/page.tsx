'use client';

import { ReactElement, useState } from "react";

import "./page.css";

/**
 * Page containing answers to frequently asked questions about the 8-bit catalog.
 */
export default function FaqPage(): ReactElement {
    const [ faqPage, setFaqPage ] = useState<"General" | "Account" | "Games">("General");

    const FAQs = [
        {type: "General", question: "What is the 8-bit catalog?", answer: ""},
        {type: "General", question: "I have a question that is not answered in the FAQ. What should I do?", answer: ""},
        {type: "Account", question: "How do I get an account?", answer: ""},
        {type: "Account", question: "I have problems signing in to my account.", answer: ""},
        {type: "Account", question: "How do I change my account email?", answer: ""},
        {type: "Games", question: "I cannot see a button for playing the game I am interested in.", answer: ""},
        {type: "Games", question: "The game I am searching for is not found.", answer: ""},
        {type: "Games", question: "Is it possible to play NES games?", answer: ""}
    ];

    return (
        <main id="faqPage">
            <section className="title-section">
                <h1 className="faqPage-title"> Frequently Asked Questions </h1>
                <h2 className="title-text"> The most frequently asked questions are gathered here. If you do not find what you are looking for, let me know, and I will be happy to assist you. </h2>
            </section>

            <section className="faq-toggle-topics">
                <button className="toggle-button" onClick={() => setFaqPage("General")}> General </button>
                <button className="toggle-button" onClick={() => setFaqPage("Account")}> Account </button>
                <button className="toggle-button" onClick={() => setFaqPage("Games")}> Games </button>
            </section>

            { faqPage === "General" ? FAQs.filter(faq => faq.type === "General").map(faq => faq.question) : <></> }

            { faqPage === "Account" ? FAQs.filter(faq => faq.type === "Account").map(faq => faq.question) : <></> }

            { faqPage === "Games" ? FAQs.filter(faq => faq.type === "Games").map(faq => faq.question) : <></> }
        </main>
    );
}