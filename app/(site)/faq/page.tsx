'use client';

import { ReactElement, useState } from "react";
import { FAQ } from "@/app/_components/common";
import { FAQ_ACCOUNT, FAQ_GAMES, FAQ_GENERAL } from "@/app/_utils/utils";

import "./page.css";

/**
 * Page containing answers to frequently asked questions about the 8-bit catalog.
 */
export default function FaqPage(): ReactElement {
    const [ faqPage, setFaqPage ] = useState<typeof FAQ_GENERAL | typeof FAQ_ACCOUNT | typeof FAQ_GAMES>(FAQ_GENERAL);

    const FAQs = [
        {type: "General", question: "What is the 8-bit catalog?", answer: "It is a website containing information about NES games as well as links to play NES games in a browser."},
        {type: "General", question: "I have a question that is not answered in the FAQ. What should I do?", answer: "Fill in and submit the form on the contact page. I will get back to you as soon as possible."},
        {type: "Account", question: "How do I get an account?", answer: "Sign up on the registration page by providing an email and a password. An activation email will be sent to the mail you provide. Click on the link provided in the email to activate your account."},
        {type: "Account", question: "I have problems signing in to my account.", answer: "Make sure you are using the correct email and password. Otherwise, fill in and submit the form on the contact page. I will get back to you as soon as possible."},
        {type: "Account", question: "How do I change my account email?", answer: "Sign in to your account and change your email in your account dashboard."},
        {type: "Games", question: "I cannot see a button for playing the game I am interested in.", answer: "Not all games in the 8-bit catalog has a link to play the game. This is because the emulator I am developing does not support all games yet. These games will get links as soon as I have implemented the corresponding NES mappers."},
        {type: "Games", question: "The game I am searching for cannot be found.", answer: "Make sure you use the correct search filters. Some games have varying developers or publishers depending on which continent the game was released. Also, some games have different titles if released in Japan compared to American or European releases. Try multiple titles. If the problem still remains, fill in and submit the form on the contact page. I will get back to you as soon as possible."},
        {type: "Games", question: "Is it possible to play NES games?", answer: "Yes. You can play most of the NES games by clicking on the Play button on the game's page. A new tab will open where you can play the chosen NES game in a browser."}
    ];

    return (
        <main id="faqPage">
            <section className="title-section">
                <h1 className="faqPage-title"> Frequently Asked Questions </h1>
                <h2 className="title-text"> The most frequently asked questions are gathered here. If you do not find what you are looking for, let me know, and I will be happy to assist you. </h2>
            </section>

            <section className="faq-toggle-topics">
                <button className={faqPage === FAQ_GENERAL ? "toggle-button active-button" : "toggle-button"} onClick={() => setFaqPage(FAQ_GENERAL)}> General </button>
                <button className={faqPage === FAQ_ACCOUNT ? "toggle-button active-button" : "toggle-button"} onClick={() => setFaqPage(FAQ_ACCOUNT)}> Account </button>
                <button className={faqPage === FAQ_GAMES ? "toggle-button active-button" : "toggle-button"} onClick={() => setFaqPage(FAQ_GAMES)}> Games </button>
            </section>

            { faqPage === FAQ_GENERAL ? FAQs.filter(faq => faq.type === FAQ_GENERAL).map(faq => <FAQ faq={faq} />) : <></> }

            { faqPage === FAQ_ACCOUNT ? FAQs.filter(faq => faq.type === FAQ_ACCOUNT).map(faq => <FAQ faq={faq} />) : <></> }

            { faqPage === FAQ_GAMES ? FAQs.filter(faq => faq.type === FAQ_GAMES).map(faq => <FAQ faq={faq} />) : <></> }
        </main>
    );
}