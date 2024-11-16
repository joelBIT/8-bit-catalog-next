import { ReactElement } from "react";
import "./OtherLinks.css";

export function OtherLinks(): ReactElement {
    return (
        <section id="otherLinks">
            <h2 className="otherLinks__title">Other Links</h2>
            <ul className="otherLinks__list">
                <li>
                    <a href="https://www.nesdev.org/" target="_blank" className="otherLinks__link">
                        <h4 className="otherLinks__link-title">NesDev</h4>
                    </a>
                </li>
                <li>
                    <a href="https://nesninja.com/game/nes/" target="_blank" className="otherLinks__link">
                        <h4 className="otherLinks__link-title">NES Ninja</h4>
                    </a>
                </li>
                <li>
                    <a href="https://nescartdb.com/" target="_blank" className="otherLinks__link">
                        <h4 className="otherLinks__link-title">NesCartDB</h4>
                    </a>
                </li>
                <li>
                    <a href="http://www.romdetectives.com/Wiki/index.php" target="_blank" className="otherLinks__link">
                        <h4 className="otherLinks__link-title">ROM Detectives</h4>
                    </a>
                </li>
            </ul>
        </section>
    );
}