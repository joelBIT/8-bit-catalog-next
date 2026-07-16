'use server';

import { updateUserAddress } from "../_db/addresses-db";
import { InsertAddress } from "../_db/schema/addresses";
import { ActionState } from "../_types/types";

export async function updateAddress(_prevState: ActionState & InsertAddress, formData: FormData): Promise<ActionState & InsertAddress> {
    const zipCode = formData.get("zip_code") as string;
    const city = formData.get("city") as string;
    const country = formData.get("country") as string;
    const street = formData.get("street") as string;

    try {
        await updateUserAddress({userId: _prevState.userId, zipCode, city, country, street});
        return { ..._prevState, message: 'The address was successfully updated', success: true };
    } catch (error) {
        console.log(error);
        return { ..._prevState, message: 'The address could not be updated', success: false };
    }
}