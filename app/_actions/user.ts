'use server';

import { ActionState } from "../_types/types";

export async function updateEmail(userId: string, _prevState: ActionState & {email: string}, formData: FormData): Promise<ActionState & {email: string}> {
    return { message: 'The email address could not be updated', success: false, email: _prevState.email };      // TODO: Implement this operation
}


export async function updateName(userId: string, _prevState: ActionState & {name: string}, formData: FormData): Promise<ActionState & {name: string}> {
    return {message: '', success: false, name: ''};           // TODO: Implement this operation
}