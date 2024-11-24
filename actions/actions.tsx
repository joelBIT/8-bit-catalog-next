'use server';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(databaseURL(), databaseKey());

function databaseURL() {
    return process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL : "";
}

function databaseKey() {
    return process.env.NEXT_PUBLIC_SUPABASE_KEY ? process.env.NEXT_PUBLIC_SUPABASE_KEY : "";
}


export async function login(prevState: any, formData: FormData) {
    const username = formData.get('username');
    const password = formData.get('password');
    console.log(username + ' ' + password);

    return { message: 'Logged in' };
}

export async function register(prevState: any, formData: FormData) {
    const username = formData.get('username');
    const password = formData.get('password');
    console.log(username + ' ' + password);

    return { message: 'Registered' };
}

export async function updateGame(id: number, formData: FormData) {
    const rawFormData = {
        title: formData.get('title'),
        developer: formData.get('developer'),
        publisher: formData.get('publisher'),
        description: formData.get("description"),
        players: formData.get('players'),
        releaseDate: formData.get('released'),
        //cover: formData.get('cover'),     // should be handled differently
        category: formData.get('category')
      };

      await supabase.from('games').update(rawFormData).eq('id', id);
}