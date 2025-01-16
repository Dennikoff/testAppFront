import { User } from "@/types";

export interface RoleOption {
  id: number;
  roleName: string;
  description: string;
} 

export interface UserForm extends Omit<User, 'id' | 'created' | 'role'> {
	roleName?: string;
  password: string;
}
