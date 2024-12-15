import TablePageTemplate, {
  SearchOption,
} from "@/shared/TablePageTemplate/TablePageTemplate";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useRef, useState } from "react";
import styles from "./AccountRegistration.module.scss";
import { Menu } from "primereact/menu";

const accList: Account[] = [
  {
    id: 1,
    login: "User1",
    name: "Alexander",
    role: "Тестировщик",
  },
  {
    id: 2,
    login: "User2",
    name: "Alexander",
    role: "Тестировщик",
  },
  {
    id: 3,
    login: "User3",
    name: "Alexander",
    role: "Тест-аналитик",
  },
  {
    id: 4,
    login: "User4",
    name: "Alexander",
    role: "Тест-аналитик",
  },
  {
    id: 5,
    login: "User5",
    name: "Alexander",
    role: "Тестировщик",
  },
  {
    id: 6,
    login: "User6",
    name: "Alexander",
    role: "Администратор",
  },
	{
    id: 1,
    login: "User1",
    name: "Alexander",
    role: "Тестировщик",
  },
  {
    id: 2,
    login: "User2",
    name: "Alexander",
    role: "Тестировщик",
  },
  {
    id: 3,
    login: "User3",
    name: "Alexander",
    role: "Тест-аналитик",
  },
  {
    id: 4,
    login: "User4",
    name: "Alexander",
    role: "Тест-аналитик",
  },
  {
    id: 5,
    login: "User5",
    name: "Alexander",
    role: "Тестировщик",
  },
  {
    id: 6,
    login: "User6",
    name: "Alexander",
    role: "Администратор",
  },
	
];

interface Account {
  id: number;
  login: string;
  name: string;
  role: string;
}

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

  const [searchOption, setSearchOption] = useState<SearchOption | null>(null);

  const accountList: Account[] = accList;

  const menu = useRef<Menu>(null);

  const items = [
    {
      label: "Удалить",
      icon: "pi pi-trash",
			command: () => {
				console.log('delete');
			}
    },
    {
      label: "Редактировать",
      icon: "pi pi-pencil",
			command: () => {
				console.log('edit');
			}
    },
  ];

  return (
    <TablePageTemplate
      searchOption={searchOption}
      setSearchOption={setSearchOption}
      searchOptionList={searchOptionList}
      header="Регистрация УЗ"
      headerButton={{ label: "Создание УЗ", action: (e) => console.log(e) }}
      searchValue={search}
      onSearchChange={setSearch}
    >
      <DataTable value={accountList} tableStyle={{ minWidth: "50rem" }}>
        <Column align="center" field="id" header="ID"></Column>
        <Column align="center" field="login" header="Логин"></Column>
        <Column align="center" field="name" header="Имя"></Column>
        <Column align="center" field="role" header="Роль"></Column>
        <Column
          align="center"
          header="Действия"
          body={() => (
            <i
              onClick={(event) => menu.current?.toggle(event)}
              className={`pi pi-ellipsis-v ${styles.actionButton}`}
            ></i>
          )}
        ></Column>
      </DataTable>
      <Menu
        model={items}
        popup
        ref={menu} 
      />
    </TablePageTemplate>
  );
}
