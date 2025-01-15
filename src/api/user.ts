import { instance } from "."



export async function fetchUsers() {
	const responce = await instance.get('/api/users/all');
	console.log(responce);
}