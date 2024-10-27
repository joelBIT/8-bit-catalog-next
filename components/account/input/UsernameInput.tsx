import { Input } from "@/components/common/input/Input";
import { ReactElement } from "react";

export function UsernameInput(): ReactElement {
    return (
        <Input id="username" type="text" placeholder="Username" />
    );
}