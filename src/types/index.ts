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
  projectId: number;
}
