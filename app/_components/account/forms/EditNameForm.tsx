'use client';

import { ReactElement, useActionState } from "react";
import { updateName } from "@/app/_actions/user";
import { FlashMessage } from "../../common";

import "./EditNameForm.css";

export function EditNameForm({ username }: { username: string }): ReactElement {
    const [state, formAction] = useActionState(updateName, { message: '', success: false, name: username });
    
    return (
        <form id="editNameForm" action={formAction}>
            <h1 className="editNameForm__title"> Change Name </h1>

            <section className="input">
                <input 
                    id="name"
                    name="name" 
                    type="text"
                    placeholder="SET NAME"
                    className="form__field"
                    defaultValue={state?.name ?? ''} 
                    autoComplete="off" 
                    required 
                />

                <span className="form__field-label">
                    Name
                </span>
            </section>

            <button className="authButton" type="submit">
                <span className="authButton__text"> Update </span>
            </button>

            <FlashMessage state={state} />
        </form>
    );
}