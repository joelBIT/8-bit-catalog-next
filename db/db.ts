import 'dotenv/config';
import { Game } from '@/interfaces/interfaces';
import { AuthWeakPasswordError, createClient } from '@supabase/supabase-js';
import { createAuthClient } from "@/utils/supabase/server";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
    apiKey: process.env.NEXT_PUBLIC_MAIL_API_KEY as string,
  });

const databaseClient = createClient(databaseURL(), databaseKey());

function databaseURL() {
    return process.env.NEXT_PUBLIC_SUPABASE_URL as string;
}

function databaseKey() {
    return process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
}

const COVERS_STORAGE = "covers";
const GAMES_TABLE = "games";





/*********
 * GAMES *
 *********/

export async function updateGameById(game: Game, file: File) {
    const { error } = await databaseClient.storage.from(COVERS_STORAGE).upload(game.cover, file);
    if (error) {
        console.log(error);
    } else {
        console.log(`Uploaded file ${file} successfully`);
    }

    return await databaseClient.from(GAMES_TABLE).update(game).eq('id', game.id);
}

export async function getGames() {
    const { data, error } = await databaseClient.from(GAMES_TABLE).select();
    if (error) {
        console.log(error);
    } else {
        for (let i = 0; i < data.length; i++) {
            data[i].imageLink = getImageLink(data[i].cover);
        }
    }

    return data;
}

export async function getGameById(id: number) {
    const { data } = await databaseClient.from(GAMES_TABLE).select().eq('id', id).single();
    data.imageLink = getImageLink(data.cover);
    return data;
}

export function getImageLink(cover: string) {
    const { data } = databaseClient.storage.from(COVERS_STORAGE).getPublicUrl(cover);
    return data.publicUrl;
}




/*********
 * USERS *
 ********/

export async function signIn(email: string, password: string) {
    const authClient = await createAuthClient();

    const { data, error } = await authClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        console.log(error);
        throw error;
    }
}

export async function signUp(email: string, password: string) {
    const authClient = await createAuthClient();

    const { data, error } = await authClient.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        console.log(error);
        if (error instanceof AuthWeakPasswordError) {
            throw new Error('Password is to weak');
        }
        throw error;
    }
}


export async function sendMail(email: string, subject: string, text: string) {
    const sentFrom = new Sender(process.env.NEXT_PUBLIC_DOMAIN_SENT_FROM as string, "8bit");
    const recipients = [new Recipient(email, "client")];

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject(subject)
        .setHtml(`<strong>${text}</strong>`)
        .setText(`${text}`);

    await mailerSend.email.send(emailParams);
}