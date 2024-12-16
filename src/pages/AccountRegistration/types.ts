export interface Account {
  id: number;
  login: string;
  name: string;
  role: AccountRole;
}

export interface AccountDialogState {
  visible: boolean;
  state: 'create' | 'edit';
}

export type AccountRole = 'testAnalyst' | 'tester' | 'administrator';
export type AccountRoleLabels = 'Тест-аналитик' | 'Тестировщик' | 'Администратор';

export interface AccountForm extends Omit<Account, 'id' | 'role'> {
	role?: AccountRole;
}
