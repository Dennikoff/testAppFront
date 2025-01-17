import { useMemo } from "react";
import { DataWithName } from "../types";
import styles from "./ItemContainer.module.scss";
import { Button } from "primereact/button";


interface Props {
  data: DataWithName;
  updateItem: (data: DataWithName) => void
}

export default function ItemContainer({ data, updateItem }: Props) {
  const properties = useMemo(() => {
    const tempMas = [];
    for (let property in data) {
      if (property === "name") continue;
      tempMas.push(`${property}: ${data[property]}`);
    }
    return tempMas;
  }, [data]);

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
        <Button label="Редактировать" size="small" className={styles.button} onClick={() => updateItem(data)}/>
      </div>
    </div>
  );
}
