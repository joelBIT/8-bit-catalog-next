import { Input } from "@/components/common/input/Input";
import { ReactElement } from "react";

export function PasswordRepeatInput(): ReactElement {
    return (
        <Input id="passwordRepeat" type="password" placeholder="Re-type Password" />
    );
}