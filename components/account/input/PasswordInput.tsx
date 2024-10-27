import { Input } from "@/components/common/input/Input";
import { ReactElement } from "react";

export function PasswordInput(): ReactElement {
    return (
        <Input id="password" type="password" placeholder="Password" />
    );
}