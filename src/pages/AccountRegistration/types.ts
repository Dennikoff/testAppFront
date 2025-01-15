import { User } from "@/types";

export interface RoleOption {
  id: number;
  roleName: string;
} 

export interface UserForm extends Omit<User, 'id' | 'created' | 'role'> {
	roleId?: number;
  password: string;
}
