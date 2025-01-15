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
import { Account, AccountForm } from "./types";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { DialogState } from "@/shared/UpdateDialog/types";
import { fetchUsers } from "@/api/user";

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

  const [activeAccount, setActiveAccount] = useState<Account>();
  const [accountForm, setAccountForm] = useState<AccountForm>({
    login: "",
    name: "",
  });

  const [searchOption, setSearchOption] = useState<SearchOption | null>(null);

  const [accountList, setAccountList] = useState<Account[]>([]);

  const [dialogState, setDialogState] = useState<DialogState>({
    visible: false,
    state: "create",
  });

  const menu = useRef<Menu>(null);

  const deleteItem = useCallback(() => {
    setAccountList(accountList.filter((val) => val.id !== activeAccount?.id));
    setDialogState({ visible: false, state: "create" });
  }, [activeAccount, accountList]);

  async function loadUserData() {
    setLoading(true);
    fetchUsers().finally(() => setLoading(false));
  }

  useEffect(() => {
    loadUserData();
  }, []);

  const roleOptions = [
    {
      label: "Тестировщик",
      value: "tester",
    },
    {
      label: "Тест-аналитик",
      value: "testAnalyst",
    },
    {
      label: "Администратор",
      value: "administrator",
    },
  ];

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
              <b>Login: {activeAccount?.login}</b>
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
          login: activeAccount!.login,
          name: activeAccount!.name,
          role: activeAccount!.role,
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
            setAccountForm({ login: "", name: "" });
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
          <Column align="center" field="login" header="Логин"></Column>
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
                  <b>Login: {activeAccount?.login}</b>
                </span>
              ),
              header: "Подтверждение удаления",
              icon: "pi pi-info-circle",
              defaultFocus: "reject",
              acceptClassName: "p-button-danger",
              accept: deleteItem,
            })
          }
        >
          <div className={styles.formFields}>
            <FloatLabel>
              <InputText
                id="username"
                value={accountForm.login}
                onChange={(e) =>
                  setAccountForm({
                    ...accountForm,
                    login: e.target.value,
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
            <Dropdown
              value={accountForm.role}
              onChange={(e: DropdownChangeEvent) =>
                setAccountForm({ ...accountForm, role: e.value })
              }
              options={roleOptions}
              placeholder="Роль"
            />
          </div>
        </UpdateDialog>
      </TablePageTemplate>
    </div>
  );
}
