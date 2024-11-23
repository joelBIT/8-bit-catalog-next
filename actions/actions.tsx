'use server';

import { createParagraphs } from "@/utils/utils";

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
      
      console.log(rawFormData);
}