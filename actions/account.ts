'use server';

export async function login(prevState: any, formData: FormData) {
    const rawFormData = {
        username: formData.get('username'),
        password: formData.get('password')
    };
    console.log(rawFormData, prevState);

    return { message: 'Logged in' };
}

export async function register(prevState: any, formData: FormData) {
    const rawFormData = {
        username: formData.get('username'),
        password: formData.get('password'),
        passwordRepeat: formData.get('passwordRepeat'),
        email: formData.get('email')
    };
    console.log(rawFormData, prevState);

    return { message: 'Registered' };
}