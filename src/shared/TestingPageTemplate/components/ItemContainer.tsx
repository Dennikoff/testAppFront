import { useMemo } from "react";
import { DataWithName } from "../types";
import styles from "./ItemContainer.module.scss";

interface Props {
  data: DataWithName;
}

export default function ItemContainer({ data }: Props) {

	const properties = useMemo(() => {
		const tempMas = [];
		for(let property in data) {
			if(property === 'name') continue
			tempMas.push(`${property}: ${data[property]}`);
		}
		return tempMas
	}, [data])

  return <div className={styles.itemWrapper}>
		<h3>{data.name}</h3>
		<hr className={styles.hr}/>
		<ul className={styles.propertyList}>
			{properties.map((val) => <li>{val}</li>)}
		</ul>	
	</div>;
}
