'use client';

import { ReactElement, useActionState, useState } from "react";
import Link from "next/link";
import { SelectCountry, StateMessage } from "../common";
import PhoneInput from "react-phone-input-2";
import { URL_LOGIN_PAGE } from "@/app/_utils/utils";
import { register } from "@/app/_actions/register";

import 'react-phone-input-2/lib/style.css';
import "./RegisterForm.css";

/**
 * Enter information and submit form in order to register a new user.
 */
export function RegisterForm(): ReactElement {
    const [state, formAction, isPending] = useActionState(register, { message: '', success: false });
    const [isVisible, setVisible] = useState<boolean>(false);
    const [isVisibleRepeat, setVisibleRepeat] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [passwordRepeat, setPasswordRepeat] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [birthDate, setBirthDate] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [maxDate] = useState<string>(() => new Date().toLocaleDateString('en-ca'));
    const [showInputs, setShowInputs] = useState<boolean>(false);

    if (state.success) {
        return (
            <section id="registerCard">
                <StateMessage state={state} />
                <section id="login-link-section" className="input">
                    <Link id="login-link" href={URL_LOGIN_PAGE} className="form__field"> Back to sign in </Link>
                </section>
            </section>
        );
    }

    /**
     * If a user enters more than 2 characters in the address field, extra input fields are shown in an extension of the input area.
     */
    function dropdown(street: string): void {
        setStreet(street);
        if (!showInputs && street.length > 2) {
            setShowInputs(true);
        }
    }

    return (
        <section id="registerCard">
            <form id="registerForm" action={formAction}>                        
                <section className="input">
                    <input 
                        id="email"
                        name="email" 
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="SET EMAIL"
                        className="form__field"
                        autoComplete="off" 
                        required 
                    />

                    <span className="form__field-label required">
                        Email
                    </span>
                </section>

                <section id="password-inputs">
                    <span id="password-requirements"> Passwords must </span>
                    <ul id="requirements-list">
                        <li> be at least 8 characters long </li>
                        <li> contain at least 1 number </li>
                    </ul>
                    <section className="input">
                        <input 
                            id="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type={isVisible ? "text" : "password"}
                            placeholder="SET PASSWORD"
                            className="form__field"
                            autoComplete="none" 
                            required 
                        />

                        <span className="form__field-label required">
                            Password
                        </span>

                        <button 
                            type="button" 
                            className="material-symbols-outlined password-show" 
                            aria-label={isVisible ? "Hide password" : "Show password"}
                            onClick={() => setVisible(!isVisible)}
                        >
                            {isVisible ? "visibility_off" : "visibility"}
                        </button>
                    </section>

                    <section className="input">
                        <input 
                            id="passwordRepeat"
                            name="passwordRepeat"
                            value={passwordRepeat}
                            onChange={e => setPasswordRepeat(e.target.value)}
                            type={isVisibleRepeat ? "text" : "password"}
                            placeholder="CONFIRM PASSWORD"
                            className="form__field"
                            autoComplete="none" 
                            required 
                        />

                        <span className="form__field-label required">
                            Confirm Password
                        </span>

                        <button 
                            type="button" 
                            className="material-symbols-outlined password-show" 
                            aria-label={isVisibleRepeat ? "Hide password" : "Show password"}
                            onClick={() => setVisibleRepeat(!isVisibleRepeat)}
                        >
                            {isVisibleRepeat ? "visibility_off" : "visibility"}
                        </button>
                    </section>
                </section>

                <section className="input">
                    <input 
                        id="birth_date"
                        name="birth_date" 
                        type="date"
                        max={maxDate}
                        value={birthDate}
                        onChange={e => setBirthDate(e.target.value)}
                        className="form__field"
                    />

                    <span className="form__field-label">
                        Date of Birth
                    </span>
                </section>

                <section id="personalInformation">
                    <section className="information-input">
                        <label className="input-label required" htmlFor="name">
                            Name
                        </label>

                        <input 
                            id="name"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)} 
                            type="text"
                            className="input-field"
                            required
                            autoComplete="none" 
                        />
                    </section>

                    <SelectCountry selected="SE" />

                    <section className="information-input">
                        <label className="input-label" htmlFor="street">
                            Street
                        </label>

                        <input 
                            id="street"
                            name="street" 
                            type="text"
                            value={street}
                            onChange={e => dropdown(e.target.value)}
                            className="input-field"
                            autoComplete="none"
                        />
                    </section>

                    <section id="extra-information" className={showInputs ? "show" : ""}>
                        <section className="information-input">
                            <label className="input-label" htmlFor="city">
                                City
                            </label>

                            <input 
                                id="city"
                                name="city" 
                                type="text"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                className="input-field"
                                autoComplete="none"
                            />
                        </section>

                        <section className="information-input">
                            <label className="input-label" htmlFor="phone">
                                Phone number
                            </label>

                            <PhoneInput 
                                country="se"
                                value={phone}
                                onChange={setPhone}
                                inputProps={{ id: 'phone', name: 'phone', autoComplete: 'tel' }}
                            />
                        </section>
                    </section>
                </section>

                <StateMessage state={state} />

                <button className="authButton" type="submit" disabled={!email || !password || !passwordRepeat || isPending}>
                    <span className="authButton__text"> Register </span>
                </button>
            </form>

            <section id="login-link-section" className="input">
                <Link id="login-link" href={URL_LOGIN_PAGE} className="form__field"> Have an account? Sign in </Link>
            </section>
        </section>
    );
}