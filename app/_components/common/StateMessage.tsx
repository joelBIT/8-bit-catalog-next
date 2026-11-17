import type { ReactElement } from "react";
import { ActionState } from "@/app/_types/types";

/**
 * Shows the message of an action result, styled as success or failure. It stays visible until the next result
 * replaces it. For a message that disappears after a few seconds, use FlashMessage.
 */
export function StateMessage({ state, className = "" }: { state: ActionState; className?: string }): ReactElement | null {
    if (!state.message) {
        return null;
    }

    return (
        <p
            role={state.success ? "status" : "alert"}        // failures are announced immediately by screen readers
            className={`${state.success ? "message-success" : "message-failure"} ${className}`.trim()}
        >
            {state.message}
        </p>
    );
}