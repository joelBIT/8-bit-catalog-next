'use server';

import { headers } from "next/headers";
import { ActionState } from "../_types/types";
import { auth } from "../auth";

export async function updateName(_prevState: ActionState & {name: string}, formData: FormData): Promise<ActionState & {name: string}> {
    const name = formData.get("name");

    if (!name) {
        return {message: 'Must supply a name', success: false, name: name as string};
    }

    await auth.api.updateUser({
        body: {
            name: name.toString()
        },
        headers: await headers()
    });
    
    return {message: 'Name updated', success: true, name: name.toString()};
}