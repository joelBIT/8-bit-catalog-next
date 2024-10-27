import { Input } from "@/components/common/input/Input";
import { ReactElement } from "react";

export function EmailInput({ placeholder }: { placeholder: string }): ReactElement {
    return (
        <Input id="email" type="email" placeholder={placeholder} />
    );
}