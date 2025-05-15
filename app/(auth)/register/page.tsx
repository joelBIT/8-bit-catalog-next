import { ReactElement } from "react";
import Image from 'next/image';
import { RegisterForm } from "@/components/auth/RegisterForm";
import image from "../../../assets/backgrounds/nes-gaming-set-in-dark.webp";

import "./page.css";
import Link from "next/link";

export default function RegisterPage(): ReactElement {
    return (
        <main id="registerPage">
            <section id="registerPage-modal">
                <section id="registerPage-image">
                    <Link href={"/"} className="registerPage-link"> <span className="material-symbols-outlined"> arrow_back </span> Back to catalog </Link>
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
            </section>
        </main>
    );
}