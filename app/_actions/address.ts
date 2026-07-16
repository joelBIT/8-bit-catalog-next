'use server';

import { updateUserAddress } from "../_db/addresses-db";
import { InsertAddress, insertAddressSchema } from "../_db/schema/addresses";
import { ActionState } from "../_types/types";

export async function updateAddress(_prevState: ActionState & InsertAddress, formData: FormData): Promise<ActionState & InsertAddress> {
    const rawData = {
        userId: _prevState.userId,
        zipCode: formData.get("zip_code"),
        city: formData.get("city"),
        country: formData.get("country"),
        street: formData.get("street")
    };

    const validatedFields = insertAddressSchema.safeParse(rawData);
    if (!validatedFields.success) {
        return { ..._prevState, message: 'The address could not be updated', success: false };
    }

    try {
        await updateUserAddress({...validatedFields.data});
        return { ..._prevState, message: 'The address was successfully updated', success: true };
    } catch (error) {
        console.log(error);
        return { ..._prevState, message: 'The address could not be updated', success: false };
    }
}