import { ReactElement } from "react";
import Image from 'next/image';

import "./Logo.css";

export function Logo(): ReactElement {
    return (
        <figure id="logo">
            <Image 
                src="/logo.png"
                alt="logo" 
                width={300}
                height={300}
                priority
                className="logo__image" 
            />
        </figure>
    );
}