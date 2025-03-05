import { arima } from "@/fonts/fonts";
import { ReactElement, useState } from "react";

import "./PasswordInput.css";

export function PasswordInput({ id, placeholder }: { id: string, placeholder: string }): ReactElement<ReactElement> {
    const [isVisible, setVisible] = useState(false);
    
    return (
        <div className="password-input">
            <input 
                id={id}
                name={id} 
                type={isVisible ? "text" : "password"}
                placeholder={placeholder}
                className={arima.className}
                autoComplete="false" 
                required 
            />
            <span className="material-symbols-outlined" onClick={() => setVisible(!isVisible)}>
                {isVisible ? "visibility_off" : "visibility"}
            </span>
        </div>
    );
}