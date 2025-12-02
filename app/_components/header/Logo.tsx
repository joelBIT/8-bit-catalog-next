import { ReactElement } from "react";
import Image from 'next/image';
import logo from "../../../assets/logo.png";

import "./Logo.css";

export function Logo(): ReactElement {
    return (
        <figure id="logo">
            <Image 
                src={logo} 
                alt="logo" 
                width={300}
                priority
                className="logo__image" 
            />
        </figure>
    );
}