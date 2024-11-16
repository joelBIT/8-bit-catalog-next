import { ReactElement } from "react";
import { Input } from "@/components/common/input/Input";

export function PasswordRepeatInput(): ReactElement {
    return (
        <Input id="passwordRepeat" type="password" placeholder="Re-type Password" />
    );
}