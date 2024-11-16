import { ReactElement } from "react";
import { Input } from "@/components/common/input/Input";

export function PasswordInput(): ReactElement {
    return (
        <Input id="password" type="password" placeholder="Password" />
    );
}