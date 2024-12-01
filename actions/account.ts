'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
    const supabase = await createClient();
    
    const loginData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
    };

    const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password
    });

    if (error) {
        //redirect('/error');
        console.log(error);
        return { message: 'Could not log in' };
    }

    revalidatePath('/', 'layout');
    redirect('/account');
}

export async function register(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const registerData = {
        name: formData.get('username') as string,
        password: formData.get('password') as string,
        passwordRepeat: formData.get('passwordRepeat') as string,
        email: formData.get('email') as string
    };

    // validate data

    const { data, error } = await supabase.auth.signUp(
        {
          email: registerData.email,
          password: registerData.password
        }
    );

    if (error) {
      //redirect('/error');
      console.log(error);
      return { message: 'Could not register account' };
    }
  
    revalidatePath('/', 'layout');
    redirect('/');
}