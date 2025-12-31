'use server';

import { updateProfileByUserId, updateProfileImageById } from "../_db/profiles-db";
import { InsertProfile } from "../_db/schema/profiles";
import { isAuthenticated } from "../_session/sessionUtils";
import { ActionState } from "../_types/types";

export async function updateProfile(_prevState: InsertProfile, formData: FormData): Promise<InsertProfile & ActionState> {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return { message: 'Must be authenticated to update user information', success: false, ..._prevState };
    }
    
    try {
        const firstName = formData.get('first_name') as string;
        const fullName = formData.get('full_name') as string;
        const lastName = formData.get('last_name') as string;
        const birthDate = new Date(formData.get('birth_date') as string);
        const phone = formData.get('phone') as string;
        const bio = formData.get('bio') as string;
        const userId = _prevState.userId;
        await updateProfileByUserId({userId, fullName, phone, birthDate, lastName, firstName, bio, image: ''});

        return { message: 'The account was successfully updated', success: true, userId, image: '', firstName, lastName, 
            bio, birthDate, fullName, phone };
    } catch (error) {
        console.log(error);
        return { message: 'The account could not be updated', success: false, ..._prevState };
    }
}

export async function updateProfileImage(userId: number, _prevState: ActionState & {image: string}, formData: FormData): Promise<ActionState & {image: string}> {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return { message: 'Must be authenticated to update profile image', success: false, image: _prevState.image };
    }
    
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