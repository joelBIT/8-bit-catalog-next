import { ReactElement } from "react";
import { Input } from "./Input";

export function TitleInput(): ReactElement {
    return (
        <Input id="gameTitle" type="text" placeholder="Game title" />
    );
}