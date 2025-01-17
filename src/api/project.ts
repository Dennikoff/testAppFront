import { Project } from '@/types';
import {privateInstance} from '.'
import { ProjectForm } from '@/pages/Testing/types';

export async function fetchProjects(): Promise<Project[]> {
	const response = await privateInstance.get('/api/projects')
	return response.data
}

export async function deleteProject(id: number) {
	return await privateInstance.delete(`/api/projects/${id}`)
}

export async function createProject(formData: ProjectForm) {
	return await privateInstance.post(`/api/projects`, formData)
}

export async function updateProject(formData: ProjectForm, id: number) {
	return await privateInstance.patch(`/api/projects/${id}`, formData)
}

