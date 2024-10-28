import { LoginForm } from "@/components/account/LoginForm";
import { ReactElement } from "react";
import styles from "./login.module.css";

export default function LoginPage(): ReactElement {
    return (
        <main id={styles.loginPage}>
            <LoginForm />
        </main>
    );
}