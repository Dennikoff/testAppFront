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

export async function updateUser(formData: UserForm, userId: number) {
	await privateInstance.patch('/api/users/patch/username/by/userId', {}, {
		params: {
			userId,
			newUsername: formData.username,
		}
	});

	// Waiting pasha to change roleId to roleName

	await privateInstance.patch('/api/users/patch/roleName/by/userId', {}, {
		params: {
			userId,
			newRoleName: formData.roleName,
		}
	});

	if(formData.password) {
		await privateInstance.patch('/api/users/patch/password/by/userId', {}, {
			params: {
				userId,
				newPassword: formData.password,
			}
		});
	}
	
	await privateInstance.patch('/api/users/patch/name/by/userId', {}, {
		params: {
			userId,
			newName: formData.name,
		}
	});
}

export async function deleteUser(userId: number) {
	await privateInstance.delete('/api/users/delete/by/userId', {
		params: {
			userId
		}
	});
}