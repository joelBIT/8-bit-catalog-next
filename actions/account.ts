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
    console.log(loginData, prevState);

    const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
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
        name: formData.get('username') as string,
        password: formData.get('password') as string,
        passwordRepeat: formData.get('passwordRepeat') as string,
        email: formData.get('email') as string
    };
    console.log(registerData, prevState);

    // validate data

    const { data, error } = await supabase.auth.signUp(
        {
          email: registerData.email,
          password: registerData.password,
          options: {
            data: {
              name: registerData.name
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