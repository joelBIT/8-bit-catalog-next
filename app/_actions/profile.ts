'use server';

import { updateProfileByUserId, updateProfileImageById } from "../_db/profiles-db";
import { InsertProfile } from "../_db/schema/profiles";
import { ActionState } from "../_types/types";

export async function updateProfile(_prevState: InsertProfile, formData: FormData): Promise<InsertProfile & ActionState> {
    try {
        const firstName = formData.get('first_name') as string;
        const lastName = formData.get('last_name') as string;
        const birthDate = formData.get('birth_date') ? new Date(formData.get('birth_date') as string) : null;
        const phone = formData.get('phone') as string;
        const bio = formData.get('bio') as string;
        const userId = _prevState.userId;
        await updateProfileByUserId({userId, phone, birthDate, lastName, firstName, bio});

        return { message: 'The account was successfully updated', success: true, userId, firstName, lastName, 
            bio, birthDate, phone };
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
            return { message: 'The account was successfully updated', success: true, image: profileImage.name };
        } else {
            return { message: 'The account was successfully updated', success: true, image: _prevState.image };
        }
    } catch (error) {
        console.log(error);
        return { message: 'The account could not be updated', success: false, image: _prevState.image };
    }
}