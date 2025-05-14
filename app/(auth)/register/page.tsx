import { ReactElement } from "react";
import Image from 'next/image';
import { RegisterForm } from "@/components/auth/RegisterForm";
import image from "../../../assets/backgrounds/nes-gaming-set-in-dark.webp";

import "./page.css";

export default function RegisterPage(): ReactElement {
    return (
        <main id="registerPage">
            <section id="registerPage-image">
                <Image 
                    src={image}
                    unoptimized
                    className="registerPage-nes-image"
                    alt="NES gaming set"
                />
            </section>

            <section id="registerPage-form"> 
                <RegisterForm />
            </section>
        </main>
    );
}