import { LoginForm } from "@/pages/Login/types";
import { instance } from ".";

export async function login(loginForm: LoginForm) {
	await instance.post('/api/auth/login', loginForm).then((data) => localStorage.setItem('jwt', data.data.token));
}


export async function logout() {
	return await instance.post('/api/auth/logout').then(() => localStorage.removeItem('jwt'));
}

