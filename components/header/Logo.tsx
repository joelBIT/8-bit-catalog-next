import { ReactElement } from "react";
import Image from 'next/image';
import logo from "../../assets/Logo.jpeg";

import "./Logo.css";

export function Logo(): ReactElement<ReactElement> {
    return (
        <figure id="logo">
            <Image src={logo} alt="logo" width={200} className="logo__image" />
        </figure>
    );
}