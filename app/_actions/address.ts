'use server';

import { InsertAddress } from "../_db/schema/addresses";
import { ActionState } from "../_types/types";

export async function updateAddress(_prevState: ActionState & InsertAddress, formData: FormData): Promise<ActionState & InsertAddress> {
    return { ..._prevState, message: 'The address was successfully updated', success: true };
}