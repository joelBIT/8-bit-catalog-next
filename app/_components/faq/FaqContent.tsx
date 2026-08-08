'use client';

import { ReactElement, useState } from "react";
import { FAQ_ACCOUNT, FAQ_GAMES, FAQ_GENERAL } from "@/app/_utils/utils";
import { FrequentlyAskedQuestion } from "@/app/_db/schema/faqs";
import { FAQ } from ".";

import "./FaqContent.css";

export function FaqContent({faqList}: {faqList: FrequentlyAskedQuestion[]}): ReactElement {
    const [faqTopic, setFaqTopic] = useState<typeof FAQ_GENERAL | typeof FAQ_ACCOUNT | typeof FAQ_GAMES>(FAQ_GENERAL);

    return(
        <section className="faq-content">
            <section className="faq-details">
                <h2 className="faq-heading">Frequently Asked Questions</h2>
                <p className="faq-text">
                    The most popular questions are gathered here. 
                    If you do not find what you are looking for, let me know, and I will be happy to assist you.
                </p>

                <section className="faq-buttons">
                    <button className={faqTopic === FAQ_GENERAL ? "toggle-button active-button" : "toggle-button"} onClick={() => setFaqTopic(FAQ_GENERAL)}> General </button>
                    <button className={faqTopic === FAQ_ACCOUNT ? "toggle-button active-button" : "toggle-button"} onClick={() => setFaqTopic(FAQ_ACCOUNT)}> Account </button>
                    <button className={faqTopic === FAQ_GAMES ? "toggle-button active-button" : "toggle-button"} onClick={() => setFaqTopic(FAQ_GAMES)}> Games </button>
                </section>
            </section>

            <section className="faq-answers">
                { faqTopic === FAQ_GENERAL ? faqList?.filter(faq => faq.type === FAQ_GENERAL).map(faq => <FAQ faq={faq} key={faq.question} />) : <></> }

                { faqTopic === FAQ_ACCOUNT ? faqList.filter(faq => faq.type === FAQ_ACCOUNT).map(faq => <FAQ faq={faq} key={faq.question} />) : <></> }

                { faqTopic === FAQ_GAMES ? faqList.filter(faq => faq.type === FAQ_GAMES).map(faq => <FAQ faq={faq} key={faq.question} />) : <></> }
            </section>
        </section>
    );
}