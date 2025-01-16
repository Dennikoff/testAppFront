import { TestPlan } from '@/types'
import {privateInstance} from '.'

export async function fetchTestPlan(): Promise<TestPlan[]> {
	const response = await privateInstance.get('/api/test-plans')
	return response.data
}