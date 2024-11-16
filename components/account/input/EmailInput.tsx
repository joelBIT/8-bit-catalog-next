import { ReactElement } from "react";
import { Input } from "@/components/common/input/Input";

export function EmailInput({ placeholder }: { placeholder: string }): ReactElement {
    return (
        <Input id="email" type="email" placeholder={placeholder} />
    );
}