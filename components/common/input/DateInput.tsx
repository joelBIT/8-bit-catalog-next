import { ChangeEvent, ReactElement } from "react";

export function DateInput({ id, label, value, setDate }: { id: string, label: string, value: string, setDate: (arg0: string) => void }): ReactElement {
    
    function handleDate(event: ChangeEvent<HTMLInputElement>): void {
        setDate(event.target.value);
    }

    return (
        <section id="releasedSection">
            <h2>{label}</h2>
            <input id={id} type="date" value={value} onChange={handleDate} required />
        </section>
    );
}