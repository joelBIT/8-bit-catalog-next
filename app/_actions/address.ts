'use server';

import { getUser } from "../_auth/server-functions";
import { updateUserAddress } from "../_db/addresses-db";
import { InsertAddress, insertAddressSchema } from "../_db/schema/addresses";
import { ActionState } from "../_types/types";

export async function updateAddress(_prevState: ActionState, formData: FormData): Promise<ActionState & Omit<InsertAddress, "userId" | "id">> {
    const user = await getUser();
    const rawData = {
        zipCode: formData.get("zip_code"),
        city: formData.get("city"),
        country: formData.get("country"),
        street: formData.get("street"),
        userId: user.id
    };

    const validatedFields = insertAddressSchema.safeParse(rawData);
    if (!validatedFields.success) {
        return { message: 'The address could not be updated', success: false };
    }

    try {
        await updateUserAddress({...validatedFields.data});
        return { message: 'The address was successfully updated', success: true, ...validatedFields.data };
    } catch (error) {
        console.log(error);
        return { message: 'The address could not be updated', success: false };
    }
}