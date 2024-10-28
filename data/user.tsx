
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