'use server';

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { ActionState } from "../_types/types";
import { auth } from "../auth";

const nameSchema = z.string()
    .trim()
    .min(1, 'Must supply a name')
    .max(100, 'Name is too long (max 100 characters)');

export async function updateName(_prevState: ActionState & {name: string}, formData: FormData): Promise<ActionState & {name: string}> {
    const typedName = String(formData.get('name') ?? '');

    const parsed = nameSchema.safeParse(typedName);
    if (!parsed.success) {
        return { message: parsed.error.issues[0].message, success: false, name: typedName };
    }

    try {
        await auth.api.updateUser({
            body: { name: parsed.data },        // trimmed
            headers: await headers()
        });
    } catch (error) {
        console.log(error);                     // includes the case of no valid session
        return { message: 'Could not update name', success: false, name: typedName };
    }

    revalidatePath('/', 'layout');              // the settings page passes the name down from the server, so refresh it
    return { message: 'Name updated', success: true, name: parsed.data };
}