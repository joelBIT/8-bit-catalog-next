import { FieldSetFrame } from "@/components/common/FieldSetFrame";
import { ReactElement } from "react";
import styles from "./about.module.css";
import { silkScreen } from "@/fonts/fonts";

export default function AboutPage(): ReactElement {
    return (
        <main id={styles.aboutPage}>
            <FieldSetFrame legend="About" body={<Text />} />
        </main>
    );
}

function Text(): ReactElement {
    return (
        <>
            <p className={`${styles.p} ${silkScreen.className}`}>
                The purpose of the 8-bit Catalog is to be an as accomplished source of NES games and ROMS as possible.
                This catalog is continuously updated with new information.
            </p>
            <p className={`${styles.p} ${silkScreen.className}`}>
                It is possible to submit requests for games that are missing in the catalog. After being reviewed
                by an admin a request can be either denied or accepted. If accepted, the game will be added to
                the catalog. A submitter will get feedback on a denied request in case the request was created while being authenticated.
            </p>
        </>
    );
}