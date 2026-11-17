import { useEffect, useState } from "react";

/**
 * Returns true while the message in `state` should be visible, and false once `duration` ms have passed.
 * Pass the whole action state object (not just the message string): every action result is a new object,
 * so two identical messages in a row still show again.
 */
export function useFlashMessage(state: { message?: string } | undefined, duration: number = 5000): boolean {
    const [dismissed, setDismissed] = useState<unknown>(null);

    useEffect(() => {
        if (!state?.message) {
            return;
        }

        const timer = setTimeout(() => setDismissed(state), duration);
        return () => clearTimeout(timer);       // a new result or unmount cancels the old timer
    }, [state, duration]);

    return !!state?.message && dismissed !== state;
}