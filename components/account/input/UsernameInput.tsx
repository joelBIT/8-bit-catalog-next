import { ReactElement } from "react";
import { Input } from "@/components/common/input/Input";

export function UsernameInput(): ReactElement {
    return (
        <Input id="username" type="text" placeholder="Username" />
    );
}