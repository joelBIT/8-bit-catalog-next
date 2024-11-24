'use server';

import { createClient } from '@supabase/supabase-js';
import { createParagraphs } from "@/utils/utils";

const supabase = createClient(databaseURL(), databaseKey());

function databaseURL() {
    return process.env.SUPABASE_URL ? process.env.SUPABASE_URL : "";
}

function databaseKey() {
    return process.env.SUPABASE_KEY ? process.env.SUPABASE_KEY : "";
}


export async function login(formData: FormData) {
    const username = formData.get('username');
    const password = formData.get('password');
    console.log(username + ' ' + password);

    return { message: 'Logged in' };
}

export async function register(formData: FormData) {
    const username = formData.get('username');
    const password = formData.get('password');
    console.log(username + ' ' + password);

    return { message: 'Registered' };
}

export async function updateGame(id: number, formData: FormData) {
    const rawFormData = {
        id: id,
        title: formData.get('title'),
        developer: formData.get('developer'),
        publisher: formData.get('publisher'),
        description: createParagraphs(formData.get("description")?.toString() || ""),
        players: formData.get('players'),
        released: formData.get('released'),
        cover: formData.get('cover'),
        category: formData.get('category')
      };

      await supabase.from('games').update({ description: rawFormData.description }).eq('id', id);
      
      console.log(rawFormData);
}