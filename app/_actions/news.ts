'use server';

import { isAuthenticatedAdmin } from "../_auth/server-functions";
import { createNews } from "../_db/news-db";
import { ActionState } from "../_types/types";

/**
 * Create news. It is possible to send out news as a newsletter. Only Admin is allowed to create news.
 */
export async function createNewsAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    const isAdmin = isAuthenticatedAdmin();
    if (!isAdmin) {
        return { message: 'Only admins may create news', success: false };
    }
        
    const heading = formData.get('heading') as string;
    const text = formData.get('message') as string;
    if (!heading || !text) {
        return { message: 'Heading and text are required', success: false };
    }

    try {
        await createNews(heading, text);

        return { message: 'The news was successfully created', success: true };
    } catch (error) {
        console.log(error);

        if (error instanceof Error) {
            return { message: error.message, success: false };
        }
        return { message: 'The news could not be created', success: false };
    }
}