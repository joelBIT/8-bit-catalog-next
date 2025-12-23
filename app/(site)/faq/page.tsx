'use client';

import { ReactElement, useEffect, useState } from "react";
import { FAQ } from "@/app/_components/common";
import { FAQ_ACCOUNT, FAQ_GAMES, FAQ_GENERAL } from "@/app/_utils/utils";
import { FrequentlyAskedQuestion } from "@/app/_types/types";
import { getFAQsRequest } from "@/app/_client/client";

import "./page.css";

/**
 * Page containing answers to frequently asked questions about the 8-bit catalog.
 */
export default function FaqPage(): ReactElement {
    const [faqPage, setFaqPage] = useState<typeof FAQ_GENERAL | typeof FAQ_ACCOUNT | typeof FAQ_GAMES>(FAQ_GENERAL);
    const [faqs, setFaqs] = useState<FrequentlyAskedQuestion[]>([]);

     useEffect(() => {    
        getQuestions();
    }, []);
    
    /**
     * Retrieve the FAQs.
     */
    async function getQuestions(): Promise<void> {
        setFaqs(await getFAQsRequest());
    }

    return (
        <main id="faqPage">
            <section className="title-section">
                <h1 className="faqPage-title"> Frequently Asked Questions </h1>
                <h2 className="title-text"> The most popular questions are gathered here. If you do not find what you are looking for, let me know, and I will be happy to assist you. </h2>
            </section>

            <section className="faq-toggle-topics">
                <button className={faqPage === FAQ_GENERAL ? "toggle-button active-button" : "toggle-button"} onClick={() => setFaqPage(FAQ_GENERAL)}> General </button>
                <button className={faqPage === FAQ_ACCOUNT ? "toggle-button active-button" : "toggle-button"} onClick={() => setFaqPage(FAQ_ACCOUNT)}> Account </button>
                <button className={faqPage === FAQ_GAMES ? "toggle-button active-button" : "toggle-button"} onClick={() => setFaqPage(FAQ_GAMES)}> Games </button>
            </section>

            { faqPage === FAQ_GENERAL ? faqs?.filter(faq => faq.type === FAQ_GENERAL).map(faq => <FAQ faq={faq} key={faq.question} />) : <></> }

            { faqPage === FAQ_ACCOUNT ? faqs?.filter(faq => faq.type === FAQ_ACCOUNT).map(faq => <FAQ faq={faq} key={faq.question} />) : <></> }

            { faqPage === FAQ_GAMES ? faqs?.filter(faq => faq.type === FAQ_GAMES).map(faq => <FAQ faq={faq} key={faq.question} />) : <></> }
   
            <img src="/faq/faq.png" alt="Catalog FAQ background image" id="faq-background" />
            <div className="darken-image-bottom" />
        </main>
    );
}