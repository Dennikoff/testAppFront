import { User } from "@/types";
import { privateInstance } from "."
import { RoleOption, UserForm } from "@/pages/AccountRegistration/types";



export async function fetchUsers(): Promise<User[]> {
	const responce = await privateInstance.get('/api/users/all');
	return responce.data
}

export async function fetchRoles(): Promise<RoleOption[]> {
	const responce = await privateInstance.get('/api/roles/all');
	return responce.data;
}

export async function registerUser(formData: UserForm) {
	await privateInstance.post('/api/users/register', formData);
}

export async function deleteUser(userId: number) {
	await privateInstance.delete('/api/users/delete/by/userId', {
		params: {
			userId
		}
	});
}