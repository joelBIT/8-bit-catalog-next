import { RegisterForm } from "@/components/account/RegisterForm";
import { ReactElement } from "react";
import styles from "./register.module.css";

export default function RegisterPage(): ReactElement {
    return (
        <main id={styles.registerPage}>
            <RegisterForm />
        </main>
    );
}