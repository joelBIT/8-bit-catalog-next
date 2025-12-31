'use client';

import { ReactElement, useActionState } from "react";
import { createNewsAction } from "@/app/_actions/news";

import "./NewsletterForm.css";

export function NewsletterForm(): ReactElement {
    const [state, formAction] = useActionState(createNewsAction, { message: '', success: false });

    return (
        <form id="newsletterForm" action={formAction}>
            <section className="information-input">
                <input
                    id="heading"
                    name="heading"
                    type="text"
                    placeholder="Heading"
                    required={true}
                    className="input-field"
                    autoComplete="none"
                />
            </section>

            <section className="information-input">
                <textarea id="message" name="message" placeholder="Text" className="input-field" required />
            </section>

            {
                state?.message ?
                    <h2 className={state?.success ? "message-success" : "message-failure"}>
                        {state?.message}
                    </h2> : <></>
            }

            <button id="createButton" className="authButton" type="submit">
                <span className="authButton__text"> Create </span>
            </button>
        </form>
    );
}