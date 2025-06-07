'use client';

import { ReactElement, useState } from "react";
import { FAQ } from "@/app/_components/common";

import "./page.css";

/**
 * Page containing answers to frequently asked questions about the 8-bit catalog.
 */
export default function FaqPage(): ReactElement {
    const [ faqPage, setFaqPage ] = useState<"General" | "Account" | "Games">("General");

    const FAQs = [
        {type: "General", icon: "info", question: "What is the 8-bit catalog?", answer: "It is a website containing information about NES games as well as links to play NES games in a browser."},
        {type: "General", icon: "help", question: "I have a question that is not answered in the FAQ. What should I do?", answer: "Fill in and submit the form on the contact page. I will get back to you as soon as possible."},
        {type: "Account", icon: "account_circle", question: "How do I get an account?", answer: "Sign up on the registration page by providing an email and a password. An activation email will be sent to the mail you provide. Click on the link provided in the email to activate your account."},
        {type: "Account", icon: "problem", question: "I have problems signing in to my account.", answer: "Make sure you are using the correct email and password. Otherwise, fill in and submit the form on the contact page. I will get back to you as soon as possible."},
        {type: "Account", icon: "mail", question: "How do I change my account email?", answer: "Sign in to your account and change your email in your account dashboard."},
        {type: "Games", icon: "visibility_off", question: "I cannot see a button for playing the game I am interested in.", answer: "Not all games in the 8-bit catalog has a link to play the game. This is because the emulator I am developing does not support all games yet. These games will get links as soon as I have implemented the corresponding NES mappers."},
        {type: "Games", icon: "location_searching", question: "The game I am searching for is not found.", answer: "Make sure you use the correct search filters. Some games have varying developers or publishers depending on which continent the game was released. Also, some games have different titles if released in Japan compared to American or European releases. Try multiple titles. If the problem still remains, fill in and submit the form on the contact page. I will get back to you as soon as possible."},
        {type: "Games", icon: "videogame_asset", question: "Is it possible to play NES games?", answer: "Yes. You can play most of the NES games by clicking on the Play button on the game's page. A new tab will open where you can play the chosen NES game in a browser."}
    ];

    return (
        <main id="faqPage">
            <section className="title-section">
                <h1 className="faqPage-title"> Frequently Asked Questions </h1>
                <h2 className="title-text"> The most frequently asked questions are gathered here. If you do not find what you are looking for, let me know, and I will be happy to assist you. </h2>
            </section>

            <section className="faq-toggle-topics">
                <button className={faqPage === "General" ? "toggle-button active-button" : "toggle-button"} onClick={() => setFaqPage("General")}> General </button>
                <button className={faqPage === "Account" ? "toggle-button active-button" : "toggle-button"} onClick={() => setFaqPage("Account")}> Account </button>
                <button className={faqPage === "Games" ? "toggle-button active-button" : "toggle-button"} onClick={() => setFaqPage("Games")}> Games </button>
            </section>

            { faqPage === "General" ? FAQs.filter(faq => faq.type === "General").map(faq => <FAQ faq={faq} />) : <></> }

            { faqPage === "Account" ? FAQs.filter(faq => faq.type === "Account").map(faq => <FAQ faq={faq} />) : <></> }

            { faqPage === "Games" ? FAQs.filter(faq => faq.type === "Games").map(faq => <FAQ faq={faq} />) : <></> }
        </main>
    );
}