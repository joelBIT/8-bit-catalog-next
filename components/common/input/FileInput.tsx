import { fileTypes } from "@/utils/utils";
import { ChangeEvent, ReactElement } from "react";

export function FileInput({ id, label, setFile }: { id: string, label: string, setFile: (arg0: File) => void }): ReactElement {
    
    function handleFile(event: ChangeEvent<HTMLInputElement>): void {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    }
    
    return (
        <section id="coverSection">
            <h2>{label}</h2>
            <input id={id} type="file" accept={fileTypes.toString()} onChange={handleFile} required />
        </section>
    );
}