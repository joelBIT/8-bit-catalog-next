'use client';

import { ReactElement, useActionState, useState } from "react";
import Link from "next/link";
import { SelectCountry } from "../common";
import PhoneInput from "react-phone-input-2";
import { arima } from "@/app/_fonts/fonts";
import { URL_LOGIN_PAGE } from "@/app/_utils/utils";
import { register } from "@/app/_actions/auth";

import 'react-phone-input-2/lib/style.css';
import "./RegisterForm.css";

/**
 * Enter information and submit form in order to register a new user.
 */
export function RegisterForm(): ReactElement {
    const [ state, formAction ] = useActionState(register, { message: '', success: false });
    const [ isVisible, setVisible ] = useState<boolean>(false);
    const [ isVisibleRepeat, setVisibleRepeat ] = useState<boolean>(false);
    const [ password, setPassword ] = useState<string>('');
    const [ passwordRepeat, setPasswordRepeat ] = useState<string>('');
    const [ email, setEmail ] = useState<string>('');
    const [ showInputs, setShowInputs ] = useState<boolean>(false);

    /**
     * If a user enters more than 2 characters in the address field, extra input fields are shown in an extension of the input area.
     */
    function dropdown(address: string): void {
        if (!showInputs && address.length > 2) {
            setShowInputs(true);
        }
    }

    return (
        <>
            { 
                state.success ?  
                    <p className="message-confirmation"> A confirmation link will be sent to your email </p>  
                    :
                    <section id="registerCard" className={arima.className}>
                        { 
                            state?.message ? 
                                <h2 className={state?.success ? "message-success" : "message-failure"}>
                                    {state?.message}
                                </h2> : <></> 
                        }

                        <form id="registerForm" action={formAction}>                        
                            <section className="input">
                                <input 
                                    id="email"
                                    name="email" 
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="SET EMAIL"
                                    className={`${arima.className} form__field`}
                                    autoComplete="off" 
                                    required 
                                />

                                <span className="form__field-label">
                                    Email
                                </span>
                            </section>

                            <section id="password-inputs">
                                <span id="password-requirements"> Passwords must </span>
                                <ul id="requirements-list">
                                    <li> be at least 8 characters long </li>
                                </ul>
                                <section className="input">
                                    <input 
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        type={isVisible ? "text" : "password"}
                                        placeholder="SET PASSWORD"
                                        className={`${arima.className} form__field`}
                                        autoComplete="off" 
                                        required 
                                    />

                                    <span className="form__field-label">
                                        Password
                                    </span>

                                    <span className="material-symbols-outlined password-show" onClick={() => setVisible(!isVisible)}>
                                        {isVisible ? "visibility_off" : "visibility"}
                                    </span>
                                </section>

                                <section className="input">
                                    <input 
                                        id="passwordRepeat"
                                        name="passwordRepeat"
                                        value={passwordRepeat}
                                        onChange={e => setPasswordRepeat(e.target.value)}
                                        type={isVisibleRepeat ? "text" : "password"}
                                        placeholder="CONFIRM PASSWORD"
                                        className={`${arima.className} form__field`}
                                        autoComplete="off" 
                                        required 
                                    />

                                    <span className="form__field-label">
                                        Confirm Password
                                    </span>

                                    <span className="material-symbols-outlined password-show" onClick={() => setVisibleRepeat(!isVisibleRepeat)}>
                                        {isVisibleRepeat ? "visibility_off" : "visibility"}
                                    </span>
                                </section>
                            </section>

                            <section className="input">
                                <input 
                                    id="birth"
                                    name="birth" 
                                    type="date"
                                    className={`${arima.className} form__field`}
                                />

                                <span className="form__field-label">
                                    Date of Birth
                                </span>
                            </section>

                            <section id="personalInformation">
                                <section className="information-input">
                                    <label className="input-label">
                                        Full name
                                    </label>

                                    <input 
                                        id="fullName"
                                        name="fullName" 
                                        type="text"
                                        className={`${arima.className} input-field`}
                                        autoComplete="off" 
                                    />
                                </section>

                                <SelectCountry />

                                <section className="information-input">
                                    <label className="input-label">
                                        Address
                                    </label>

                                    <input 
                                        id="address"
                                        name="address" 
                                        type="text"
                                        onChange={e => dropdown(e.target.value)}
                                        className={`${arima.className} input-field`}
                                        autoComplete="off"
                                    />
                                </section>

                                <section id="extra-information" className={showInputs ? "show" : ""}>
                                    <section className="information-input">
                                        <label className="input-label">
                                            City
                                        </label>

                                        <input 
                                            id="city"
                                            name="city" 
                                            type="text"
                                            className={`${arima.className} input-field`}
                                            autoComplete="off"
                                        />
                                    </section>

                                    <section className="information-input">
                                        <label className="input-label">
                                            Phone number
                                        </label>

                                        <PhoneInput country="se" />
                                    </section>
                                </section>
                            </section>

                            <button className="authButton" type="submit" disabled={!email || !password || !passwordRepeat}>
                                <span className="authButton__text"> Register </span>
                            </button>
                        </form>

                        <section id="login-link-section" className="input">
                            <Link id="login-link" href={URL_LOGIN_PAGE} className="form__field"> Have an account? Sign in </Link>
                        </section>
                    </section>
            }
        </>
    );
}