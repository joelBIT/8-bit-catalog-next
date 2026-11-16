'use server';

import { getUser } from "../_auth/server-functions";
import { updateProfileByUserId, updateProfileImageById } from "../_db/profiles-db";
import { InsertProfile, insertProfileSchema } from "../_db/schema/profiles";
import { ActionState } from "../_types/types";

export async function updateProfile(_prevState: ActionState, formData: FormData): Promise<ActionState & Omit<InsertProfile, "userId">> {
    const user = await getUser();
    const rawData: InsertProfile = {
        firstName: formData.get('first_name') as string,
        lastName: formData.get('last_name') as string,
        birthDate: formData.get('birth_date') ? new Date(formData.get('birth_date') as string) : null,
        phone: formData.get('phone') as string,
        bio: formData.get('bio') as string,
        userId: user.id
    }

    const validatedFields = insertProfileSchema.safeParse(rawData);
    if (!validatedFields.success) {
        return { message: 'The account could not be updated', success: false };
    }

    try {
        await updateProfileByUserId({...validatedFields.data});
        return { message: 'The account was successfully updated', success: true, ...validatedFields.data };
    } catch (error) {
        console.log(error);
        return { message: 'The account could not be updated', success: false};
    }
}

export async function updateProfileImage(_prevState: ActionState & {image: string}, formData: FormData): Promise<ActionState & {image: string}> {
    const user = await getUser();
    try {
        const profileImage = formData.get('profileImage') as File;
        if (profileImage.name !== 'undefined') {                        // Profile image has been changed
            await updateProfileImageById(user.id, profileImage);             // Upload new profile image
            return { message: 'The profile image was successfully updated', success: true, image: profileImage.name };
        } else {
            return { message: 'The profile image was successfully updated', success: true, image: _prevState.image };
        }
    } catch (error) {
        console.log(error);
        return { message: 'The profile image could not be updated', success: false, image: _prevState.image };
    }
}