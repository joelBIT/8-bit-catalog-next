'use server';

import { requireUser } from "../_auth/server-functions";
import { updateUserAddress } from "../_db/addresses-db";
import { insertAddressSchema } from "../_db/schema/addresses";
import { AddressState } from "../_types/types";
import { readFormValues } from "../_utils/utils";

export async function updateAddress(_prevState: AddressState, formData: FormData): Promise<AddressState> {
    // What the user typed. Returned with every failure so the form can show it again.
    const values = readFormValues(formData, ['zip_code', 'city', 'country', 'street'] as const);
    const validatedFields = insertAddressSchema.safeParse(values);
    if (!validatedFields.success) {
        return { message: 'The address could not be updated', success: false, ...values };
    }
    
    try {
        const user = await requireUser();
        await updateUserAddress({userId: user.id, ...values});
        return { message: 'The address was successfully updated', success: true, ...values };
    } catch (error) {
        console.log(error);
        return { message: 'The address could not be updated', success: false, ...values };
    }
}