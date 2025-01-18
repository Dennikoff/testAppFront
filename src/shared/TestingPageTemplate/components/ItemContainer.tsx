import { useMemo, useState } from "react";
import { DataWithName } from "../types";
import styles from "./ItemContainer.module.scss";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { MultiStateCheckbox } from "primereact/multistatecheckbox";

interface Props {
  data: DataWithName;
  updateItem: (data: DataWithName) => void;
  step?: boolean;
}

export default function ItemContainer({ data, updateItem, step }: Props) {
  const [value, setValue] = useState("public");
  const options = [
    { value: "SUCCESS", icon: "pi pi-check" },
    { value: "FAILED", icon: "pi pi-times" },
  ];
  const [dialogVisible, setDialogVisible] = useState(false);
  const properties = useMemo(() => {
    const tempMas = [];
    for (let property in data) {
      if (property === "name") continue;
      tempMas.push(`${property}: ${data[property]}`);
    }
    return tempMas;
  }, [data]);

  const columns = [
    { field: "ordering", header: "Номер" },
    { field: "action", header: "Действие" },
    { field: "expectedResult", header: "Ожидаемый результат" },
    { field: "status", header: "Статус" },
    { field: "testCaseId", header: "Тест-кейс" },
  ];

  const dynamicColumns = columns.map((col) => {
    return (
      <Column
        key={col.field}
        columnKey={col.field}
        field={col.field}
        header={col.header}
      />
    );
  });

  return (
    <div className={styles.itemWrapper}>
      <h3>{data.name}</h3>
      <hr className={styles.hr} />
      <ul className={styles.propertyList}>
        {properties.map((val) => (
          <li key={val}>{val}</li>
        ))}
      </ul>
      <div className={styles.buttonWrapper}>
        {step && (
          <Button
            outlined
            label="Шаги"
            size="small"
            onClick={() => setDialogVisible(true)}
          />
        )}
        {step && (
          <Dialog
            visible={dialogVisible}
            onHide={() => setDialogVisible(false)}
            style={{ width: "70vw" }}
          >
            <DataTable
              value={data.stepList}
              reorderableColumns
              reorderableRows
              onRowReorder={(e) => console.log(e.value)}
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column rowReorder style={{ width: "3rem" }} />
              <Column
                style={{ width: "3rem" }}
                body={
                  <MultiStateCheckbox
                    value={value}
                    onChange={(e) => setValue(e.value)}
                    options={options}
                    optionValue="value"
                    className={value === 'FAILED' ? 'p-invalid' : ''}
                  />
                }
              />
              {dynamicColumns}
            </DataTable>
          </Dialog>
        )}
        <Button
          label="Редактировать"
          size="small"
          className={styles.button}
          onClick={() => updateItem(data)}
        />
      </div>
    </div>
  );
}
