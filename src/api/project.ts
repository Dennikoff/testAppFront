import { Project } from '@/types';
import {privateInstance} from '.'

export async function fetchProjects(): Promise<Project[]> {
	const response = await privateInstance.get('/api/projects')
	return response.data
}