import { ReactElement } from "react";

export function Modal({ title, showModal, confirm }: { title: string, showModal: (arg0: boolean) => void, confirm: () => void }): ReactElement<ReactElement> {
    
    return (
        <dialog id="modal" open>
            <form method="dialog">
                <p>Are you sure you want to delete {title}</p>
                <div className="buttons">
                    <button onClick={() => showModal(false)} className="gameButton">Cancel</button>
                    <button onClick={confirm} className="gameButton">Confirm</button>
                </div>
            </form>
        </dialog>
    );
}