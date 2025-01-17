import { Project, TestCase, TestPlan } from "@/types";

export type ProjectForm = Omit<Project, 'id'>

export interface TestPlanForm extends Pick<TestPlan, 'name'> {
	taskKey?: TestPlan['taskKey'];
	projectId?: TestPlan['projectId'];
}

export  interface TestCaseForm extends Pick<TestCase, 'name' | 'preCondition' | 'postCondition'> {
	testPlanId?: TestCase['testPlanId'];
}

export type ProjectOption = Project;