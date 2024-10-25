import { ReactElement } from "react";

export function DescriptionInput({ form }: { form: string }): ReactElement {
    return (
        <textarea 
                id="description" 
                form={form} 
                placeholder="Description" 
                autoComplete="false" 
                required 
            />
    );
}