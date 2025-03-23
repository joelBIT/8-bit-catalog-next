'use client';

import { ReactElement, useRef, useActionState } from "react";
import { arima } from "@/fonts/fonts";
import { register } from "@/actions/account";
import { Input } from "../common/Input";
import { PasswordInput } from "../common/PasswordInput";

import "./AccountForm.css";

export function AccountForm(): ReactElement<ReactElement> {
    const [state, formAction] = useActionState(register, { message: '', success: false});
    const formRef = useRef<HTMLFormElement>(null);

    if (formRef.current) {
        formRef.current?.reset();
    }

    return (
        <section id="accountCard" className={arima.className}>
            <h1 className="accountCard__title">Edit Account</h1>

            { state?.message ? <h2 className={state?.success ? "message-success" : "message-failure"}>
                {state?.message}
            </h2> : <></> }

            <form id="accountForm" ref={formRef} action={formAction}>
                <Input id="firstName" type="text" placeholder="First Name" />
                <Input id="lastName" type="text" placeholder="Last Name" />
                <PasswordInput id="password" placeholder="Password" />
                <PasswordInput id="passwordRepeat" placeholder="Re-type Password" />

                <button className="accountButton" type="submit">Save</button>
            </form>
        </section>
    );
}