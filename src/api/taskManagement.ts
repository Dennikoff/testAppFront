
import { tmProject, tmTasks } from '@/types'
import {privateInstance} from '.'

export async function fetchTmProjects(): Promise<tmProject[]> {
	const response = await privateInstance.get('/api/task-management/projects')
	return response.data
}

export async function fetchTmTasks(projectId: number): Promise<tmTasks[]> {
	const response = await privateInstance.get(`/api/task-management/projects/${projectId}/tasks`)
	return response.data
}