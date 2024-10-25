import { ReactElement } from "react";
import { Input } from "./Input";

export function PublisherInput(): ReactElement {
    return (
        <Input id="publisher" type="text" placeholder="Publisher" />
    );
}