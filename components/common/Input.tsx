import { arima } from "@/fonts/fonts";
import { ReactElement } from "react";

export function Input({ id, type, placeholder }: { id: string, type: string, placeholder: string }): ReactElement<ReactElement> {
    return (
        <input 
            id={id}
            name={id} 
            type={type} 
            placeholder={placeholder}
            className={arima.className}
            autoComplete="false" 
            required 
        />
    );
}