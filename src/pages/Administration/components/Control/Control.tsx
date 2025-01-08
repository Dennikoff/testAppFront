import TablePageTemplate, {
  SearchOption,
} from "@/shared/TablePageTemplate/TablePageTemplate";
import styles from "../../Administration.module.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";
import AccountDialog from "@/shared/UpdateDialog/UpdateDialog";
import { Asuz } from "../../types";
import { useCallback, useRef, useState } from "react";
import { AccountDialogState } from "@/pages/AccountRegistration/types";
import { confirmDialog } from "primereact/confirmdialog";

const asuz: Asuz[] = [
  {
    name: "asuz1",
    url: "https://some-url.ru",
  },
  {
    name: "asuz2",
    url: "https://some-url.ru",
  },
  {
    name: "asuz3",
    url: "https://some-url.ru",
  },
  {
    name: "asuz4",
    url: "https://some-url.ru",
  },
  {
    name: "asuz5",
    url: "https://some-url.ru",
  },
  {
    name: "asuz6",
    url: "https://some-url.ru",
  },
];

export default function Control() {
  const [search, setSearch] = useState<string>("");
  const searchOptionList: SearchOption[] = [
    {
      label: "Поиск по имени",
      value: "name",
    },
    {
      label: "Поиск по Url",
      value: "url",
    },
  ];

  const [searchOption, setSearchOption] = useState<SearchOption | null>(null);

  const [dialogState, setDialogState] = useState<AccountDialogState>({
    visible: false,
    state: "create",
  });

  const [acitveAsuz, setActiveAsuz] = useState<Asuz>();
	const [asuzList, setAsuzList] = useState<Asuz[]>(asuz);
  const menu = useRef<Menu>(null);

	const deleteItem = useCallback(() => {
		setAsuzList(asuzList.filter((val) => val.name !== acitveAsuz?.name));
			setDialogState({ visible: false, state: "create" });
		}, [acitveAsuz, asuzList]);

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
              <b>Name: {acitveAsuz?.name}</b>
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
    <div className={`page-container ${styles.page}`}>
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
          value={asuzList}
          className={styles.table}
        >
          <Column align="center" field="name" header="Название АСУЗ"></Column>
          <Column align="center" field="url" header="URL"></Column>
          <Column
            align="center"
            header="Действия"
            body={(data) => (
              <i
                onClick={(event) => {
                  setActiveAsuz(data);
                  menu.current?.toggle(event);
                }}
                className={`pi pi-ellipsis-v ${styles.actionButton}`}
              ></i>
            )}
          ></Column>
        </DataTable>
        <Menu model={items} popup ref={menu} />
        
      </TablePageTemplate>
    </div>
  );
}
