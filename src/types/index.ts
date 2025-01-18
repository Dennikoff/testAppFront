export type Status = "SUCCESS" | "FAIL" | "TO DO";

export interface User {
  id: number;
  username: string;
  name: string;
  role: string;
  created: Date;
}

export interface Project {
  id: number;
  name: string;
}

export interface TestPlan {
  id: number;
  name: string;
  taskId: number;
  status: Status;
  projectId: number;
  testCases?: string;
}

export interface TestCase {
  id: number;
  name: string;
  preCondition: string;
  postCondition: string;
  status: Status;
  testPlanId: number;
  stepList?: Step[];
}

export interface tmProject {
  id: number;
  title: string;
}

export interface tmTasks {
  id: number;
  key: string;
  title: string;
  taskState: string;
}

export interface Step {
  id: number;
  ordering: number;
  action: string;
  expectedResult: string;
  actualResult: string | null;
  status: Status;
  testCaseId: number;
}
