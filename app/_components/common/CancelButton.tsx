'use client';

import { useRouter } from "next/navigation";
import { ReactElement } from "react";

/**
 * This button is used to navigate to the supplied url when pressing cancel.
 */
export function CancelButton({ url }: { url: string }): ReactElement {
    const router = useRouter();
    
    return (
        <button 
            id="cancelButton" 
            className="gameButton" 
            type="reset" 
            onClick={() => router.push(url)}
        > 
            Cancel 
        </button>
    );
}