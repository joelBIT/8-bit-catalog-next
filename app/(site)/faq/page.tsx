import { ReactElement } from "react";
import { getFAQs } from "@/app/_db/faq-db";
import { FaqContent } from "@/app/_components/faq";

import "./page.css";

/**
 * Page containing answers to frequently asked questions about the 8-bit catalog.
 */
export default async function FaqPage(): Promise<ReactElement> {
    
    return (
        <main id="faqPage">
            <div className="faq-title">
                Help Center
            </div>

            <FaqContent faqList={await getFAQs()} />

            <div className="darken-image-bottom" />
        </main>
    );
}