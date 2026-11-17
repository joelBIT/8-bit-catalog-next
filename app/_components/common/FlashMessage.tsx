'use client';

import type { ReactElement } from "react";
import { useFlashMessage } from "@/app/_hooks";
import { ActionState } from "@/app/_types/types";

/**
 * Shows the message of an action result for a few seconds, styled as success or failure.
 */
export function FlashMessage({ state, duration = 5000 }: { state: ActionState; duration?: number }): ReactElement | null {
    const visible = useFlashMessage(state, duration);

    if (!visible) {
        return null;
    }

    return (
        <h2 role="status" className={state.success ? "message-success message-fade" : "message-failure message-fade"}>
            {state.message}
        </h2>
    );
}