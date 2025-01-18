import { Step, TestCase } from '@/types'
import {privateInstance} from '.'
import { TestCaseForm } from '@/pages/Testing/types'

export async function fetchTestCase(): Promise<TestCase[]> {
	const response = await privateInstance.get('/api/test-cases')
	return response.data
}

export async function deleteTestCase(id: number) {
	return await privateInstance.delete(`/api/test-cases/${id}`)
}

export async function createTestCase(formData: TestCaseForm) {
	return await privateInstance.post(`/api/test-cases`, formData)
}

export async function updateTestCase(formData: TestCaseForm, id: number) {
	return await privateInstance.patch(`/api/test-cases/${id}`, formData)
}

export async function fetchConnectedSteps(testCaseId: number): Promise<Step[]> {
	const response = await privateInstance.get(`/api/test-cases/${testCaseId}/steps`)
	return response.data
}
