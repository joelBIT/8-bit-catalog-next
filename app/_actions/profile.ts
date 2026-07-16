'use server';

import { updateProfileByUserId, updateProfileImageById } from "../_db/profiles-db";
import { InsertProfile, insertProfileSchema } from "../_db/schema/profiles";
import { ActionState } from "../_types/types";

export async function updateProfile(_prevState: InsertProfile, formData: FormData): Promise<InsertProfile & ActionState> {
    const rawData = {
        firstName: formData.get('first_name'),
        lastName: formData.get('last_name'),
        birthDate: formData.get('birth_date') ? new Date(formData.get('birth_date') as string) : null,
        phone: formData.get('phone'),
        bio: formData.get('bio'),
        userId: _prevState.userId
    }

    const validatedFields = insertProfileSchema.safeParse(rawData);
    if (!validatedFields.success) {
        return { message: 'The account could not be updated', success: false, ..._prevState };
    }

    try {
        await updateProfileByUserId({...validatedFields.data});
        return { message: 'The account was successfully updated', success: true, ...validatedFields.data };
    } catch (error) {
        console.log(error);
        return { message: 'The account could not be updated', success: false, ..._prevState };
    }
}

export async function updateProfileImage(userId: string, _prevState: ActionState & {image: string}, formData: FormData): Promise<ActionState & {image: string}> {
    try {
        const profileImage = formData.get('profileImage') as File;
        if (profileImage.name !== 'undefined') {                        // Profile image has been changed
            await updateProfileImageById(userId, profileImage);             // Upload new profile image
            return { message: 'The profile image was successfully updated', success: true, image: profileImage.name };
        } else {
            return { message: 'The profile image was successfully updated', success: true, image: _prevState.image };
        }
    } catch (error) {
        console.log(error);
        return { message: 'The profile image could not be updated', success: false, image: _prevState.image };
    }
}