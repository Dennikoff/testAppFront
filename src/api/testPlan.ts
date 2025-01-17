import { TestPlan } from '@/types'
import {privateInstance} from '.'
import { TestPlanForm } from '@/pages/Testing/types'

export async function fetchTestPlan(): Promise<TestPlan[]> {
	const response = await privateInstance.get('/api/test-plans')
	return response.data
}

export async function deleteTestPlan(id: number) {
	return await privateInstance.delete(`/api/test-plans/${id}`)
}

export async function createTestPlan(formData: TestPlanForm) {
	return await privateInstance.post(`/api/test-plans`, formData)
}

export async function updateTestPlan(formData: TestPlanForm, id: number) {
	return await privateInstance.patch(`/api/test-plans/${id}`, formData)
}

