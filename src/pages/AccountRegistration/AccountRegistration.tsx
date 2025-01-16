import TablePageTemplate, {
  SearchOption,
} from "@/shared/TablePageTemplate/TablePageTemplate";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./AccountRegistration.module.scss";
import { Menu } from "primereact/menu";
import { confirmDialog } from "primereact/confirmdialog";
import UpdateDialog from "../../shared/UpdateDialog/UpdateDialog";
import { UserForm, RoleOption } from "./types";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { DialogState } from "@/shared/UpdateDialog/types";
import { deleteUser, fetchRoles, fetchUsers, registerUser, updateUser } from "@/api/user";
import { User } from "@/types";

export default function AccountRegistration() {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const searchOptionList: SearchOption[] = [
    {
      label: "Поиск по логину",
      value: "login",
    },
    {
      label: "Поиск по имени",
      value: "name",
    },
    {
      label: "Поиск по Роли",
      value: "role",
    },
  ];

  const [activeAccount, setActiveAccount] = useState<User>();
  const [accountForm, setAccountForm] = useState<UserForm>({
    username: "",
    password: "",
    name: "",
  });

  const [searchOption, setSearchOption] = useState<SearchOption | null>(null);

  const [accountList, setAccountList] = useState<User[]>([]);

  const [dialogState, setDialogState] = useState<DialogState>({
    visible: false,
    state: "create",
  });

  const [roleOptionList, setRoleOptionList] = useState<RoleOption[]>([]);

  const menu = useRef<Menu>(null);

  const deleteItem = useCallback(async () => {
    await deleteUser(activeAccount!.id);
    loadUserData();
    setDialogState({ visible: false, state: "create" });
  }, [activeAccount, accountList]);

  async function loadUserData() {
    setLoading(true);
    fetchUsers()
      .then((data) => {
        setAccountList(data);
      })
      .finally(() => setLoading(false));
  }

  async function loadRoleValues() {
    fetchRoles().then((data) => {
      setRoleOptionList(data);
    });
  }

  useEffect(() => {
    loadUserData();
    loadRoleValues();
  }, []);

  const items = [
    {
      label: "Удалить",
      icon: "pi pi-trash",
      command: () => {
        confirmDialog({
          message: (
            <span>
              Вы действительно хотите удалить запись:
              <br />
              <b>Username: {activeAccount?.username}</b>
            </span>
          ),
          header: "Подтверждение удаления",
          icon: "pi pi-info-circle",
          defaultFocus: "reject",
          acceptClassName: "p-button-danger",
          accept: deleteItem,
        });
      },
    },
    {
      label: "Редактировать",
      icon: "pi pi-pencil",
      command: () => {
        setAccountForm({
          username: activeAccount!.username,
          password: "",
          name: activeAccount!.name,
          roleName: activeAccount?.role,
        });
        setDialogState({ visible: true, state: "edit" });
      },
    },
  ];

  return (
    <div className="page-wrapper" style={{ flexGrow: 1, overflow: "hidden" }}>
      <TablePageTemplate
        searchOption={searchOption}
        setSearchOption={setSearchOption}
        searchOptionList={searchOptionList}
        header="Регистрация УЗ"
        headerButton={{
          label: "Создание УЗ",
          action: () => {
            setAccountForm({ username: "", password: "", name: "" });
            setDialogState({ visible: true, state: "create" });
          },
        }}
        searchValue={search}
        onSearchChange={setSearch}
      >
        <DataTable
          paginator
          rows={15}
          scrollable
          scrollHeight="100%"
          value={accountList}
          className={styles.table}
          loading={loading}
        >
          <Column align="center" field="id" header="ID"></Column>
          <Column align="center" field="username" header="Логин"></Column>
          <Column align="center" field="name" header="Имя"></Column>
          <Column align="center" field="role" header="Роль"></Column>
          <Column
            align="center"
            header="Действия"
            body={(data) => (
              <i
                onClick={(event) => {
                  setActiveAccount(data);
                  menu.current?.toggle(event);
                }}
                className={`pi pi-ellipsis-v ${styles.actionButton}`}
              ></i>
            )}
          ></Column>
        </DataTable>
        <Menu model={items} popup ref={menu} />
        <UpdateDialog
          dialogState={dialogState}
          setDialogState={setDialogState}
          onDelete={() =>
            confirmDialog({
              message: (
                <span>
                  Вы действительно хотите удалить запись:
                  <br />
                  <b>Username: {activeAccount?.username}</b>
                </span>
              ),
              header: "Подтверждение удаления",
              icon: "pi pi-info-circle",
              defaultFocus: "reject",
              acceptClassName: "p-button-danger",
              accept: deleteItem,
            })
          }
          onCreate={async () => {
            await registerUser(accountForm);
            loadUserData();
          }}
          onUpdate={async () => {
            await updateUser(accountForm, activeAccount!.id);
            loadUserData();
          }}
        >
          <div className={styles.formFields}>
            <FloatLabel>
              <InputText
                id="username"
                value={accountForm.username}
                onChange={(e) =>
                  setAccountForm({
                    ...accountForm,
                    username: e.target.value,
                  })
                }
              />
              <label htmlFor="username">Логин</label>
            </FloatLabel>
            <FloatLabel>
              <InputText
                id="name"
                value={accountForm.name}
                onChange={(e) =>
                  setAccountForm({ ...accountForm, name: e.target.value })
                }
              />
              <label htmlFor="name">Имя</label>
            </FloatLabel>
            <FloatLabel>
              <InputText
                id="password"
                value={accountForm.password}
                onChange={(e) =>
                  setAccountForm({ ...accountForm, password: e.target.value })
                }
              />
              <label htmlFor="password">Пароль</label>
            </FloatLabel>
            <Dropdown
              value={accountForm.roleName}
              optionLabel="description"
              optionValue="roleName"
              onChange={(e: DropdownChangeEvent) =>
                setAccountForm({ ...accountForm, roleName: e.value })
              }
              options={roleOptionList}
              placeholder="Роль"
            />
          </div>
        </UpdateDialog>
      </TablePageTemplate>
    </div>
  );
}
