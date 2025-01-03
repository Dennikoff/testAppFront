import TablePageTemplate, {
  SearchOption,
} from "@/shared/TablePageTemplate/TablePageTemplate";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { MouseEvent, useCallback, useRef, useState } from "react";
import styles from "./AccountRegistration.module.scss";
import { Menu } from "primereact/menu";
import { confirmDialog } from "primereact/confirmdialog";
import AccountDialog from "./components/AccountDialog/AccountDialog";
import { Account, AccountDialogState } from "./types";

const accList: Account[] = [
  {
    id: 1,
    login: "User1",
    name: "Alexander",
    role: "tester",
  },
  {
    id: 2,
    login: "User2",
    name: "Alexander",
    role: "tester",
  },
  {
    id: 3,
    login: "User3",
    name: "Alexander",
    role: "testAnalyst",
  },
  {
    id: 4,
    login: "User4",
    name: "Alexander",
    role: "testAnalyst",
  },
  {
    id: 5,
    login: "User5",
    name: "Alexander",
    role: "tester",
  },
  {
    id: 6,
    login: "User6",
    name: "Alexander",
    role: "administrator",
  },
  {
    id: 7,
    login: "User1",
    name: "Alexander",
    role: "tester",
  },
  {
    id: 8,
    login: "User2",
    name: "Alexander",
    role: "tester",
  },
  {
    id: 9,
    login: "User3",
    name: "Alexander",
    role: "testAnalyst",
  },
  {
    id: 10,
    login: "User4",
    name: "Alexander",
    role: "testAnalyst",
  },
  {
    id: 11,
    login: "User5",
    name: "Alexander",
    role: "tester",
  },
  {
    id: 12,
    login: "User6",
    name: "Alexander",
    role: "administrator",
  },
  {
    id: 13,
    login: "User4",
    name: "Alexander",
    role: "testAnalyst",
  },
  {
    id: 14,
    login: "User5",
    name: "Alexander",
    role: "tester",
  },
  {
    id: 15,
    login: "User6",
    name: "Alexander",
    role: "administrator",
  },
  {
    id: 16,
    login: "User4",
    name: "Alexander",
    role: "testAnalyst",
  },
  {
    id: 17,
    login: "User5",
    name: "Alexander",
    role: "tester",
  },
  {
    id: 18,
    login: "User6",
    name: "Alexander",
    role: "administrator",
  },
];

export default function AccountRegistration() {
  const [search, setSearch] = useState<string>("");
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

  const [searchOption, setSearchOption] = useState<SearchOption | null>(null);

  const [accountList, setAccountList] = useState<Account[]>(accList);

  const [dialogState, setDialogState] = useState<AccountDialogState>({
    visible: false,
    state: "create",
  });

  const menu = useRef<Menu>(null);

  const deleteItem = useCallback(() => {
    setAccountList(accountList.filter((val) => val.id !== activeAccount?.id));
    setDialogState({ visible: false, state: "create" });
  }, [activeAccount, accountList]);

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
        setDialogState({ visible: true, state: "edit" });
      },
    },
  ];

  return (
    <div className="page-wrapper" style={{flexGrow: 1, overflow: 'hidden'}}>
      <TablePageTemplate
        searchOption={searchOption}
        setSearchOption={setSearchOption}
        searchOptionList={searchOptionList}
        header="Регистрация УЗ"
        headerButton={{
          label: "Создание УЗ",
          action: () => setDialogState({ visible: true, state: "create" }),
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
        <AccountDialog
          account={activeAccount}
          dialogState={dialogState}
          setDialogState={setDialogState}
          onDelete={() => {
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
          }}
        />
      </TablePageTemplate>
    </div>
  );
}
