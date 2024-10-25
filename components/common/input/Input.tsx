import { ReactElement } from "react";

export function Input({ id, type, placeholder }: { id: string, type: string, placeholder: string }): ReactElement {
    return (
        <input 
            id={id} 
            type={type} 
            placeholder={placeholder} 
            autoComplete="false" 
            required 
        />
    );
}