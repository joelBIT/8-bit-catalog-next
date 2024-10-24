import { ReactElement } from "react";

export default function Game({ params }: { params: { id: string } }): ReactElement {
    return (
        <section>
            <h1>{params.id}</h1>
        </section>
    );
}