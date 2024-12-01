'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
    const supabase = await createClient();
    
    const loginData = {
        username: formData.get('username') as string,
        password: formData.get('password') as string
    };
    console.log(loginData, prevState);

    const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.username,
        password: loginData.password
    });

    console.log(data);  

    if (error) {
        //redirect('/error');
        console.log(error);
    }

    revalidatePath('/', 'layout');
    redirect('/');

    return { message: 'Logged in' };
}

export async function register(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const registerData = {
        username: formData.get('username') as string,
        password: formData.get('password') as string,
        passwordRepeat: formData.get('passwordRepeat') as string,
        email: formData.get('email') as string
    };
    console.log(registerData, prevState);

    const { data, error } = await supabase.auth.signUp(
        {
          email: registerData.email,
          password: registerData.password,
          options: {
            data: {
              user_name: registerData.username
            }
          }
        }
    );

    console.log(data);

    if (error) {
      //redirect('/error');
      console.log(error);
    }
  
    revalidatePath('/', 'layout');
    redirect('/');

    return { message: 'Registered' };
}