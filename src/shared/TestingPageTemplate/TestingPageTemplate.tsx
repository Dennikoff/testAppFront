import { ReactNode } from "react";
import styles from "./TestingPageTemplate.module.scss";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import ItemContainer from "./components/ItemContainer";
import { DataWithName } from "./types";

interface TestingPageTemplateProps {
  header: string;
  headerButton?: { label: string; action: () => void };
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchOptionList: SearchOption[];
  searchOption: SearchOption | null;
  setSearchOption: (value: SearchOption) => void;
  data: DataWithName[];
}

export interface SearchOption {
  label: string;
  value: string;
}

export function TestingPageTemplate({
  header,
  headerButton,
  searchValue,
  onSearchChange,
  searchOptionList,
  searchOption,
  setSearchOption,
  data,
}: TestingPageTemplateProps) {
  return (
    <div className={`page-container ${styles.tablePageWrapper}`}>
      <div className={styles.headerContainer}>
        <h1>{header}</h1>
        {headerButton && (
          <Button
            label={headerButton.label}
            className={styles.headerButton}
            onClick={headerButton.action}
            icon="pi pi-plus"
            iconPos="right"
          />
        )}
      </div>
      <div className={styles.filerContainer}>
        <div className={styles.searchField}>
          <FloatLabel>
            <InputText
              id="search"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <label htmlFor="username">Поиск</label>
          </FloatLabel>
        </div>
        <div className={styles.dropdownField}>
          <Dropdown
            value={searchOption}
            onChange={(e) => setSearchOption(e.value)}
            options={searchOptionList}
            placeholder="Поиск по"
          />
        </div>
      </div>
      <div className={styles.tableWrapper}>
        <ul className={styles.itemsList}>
          {data.map((val) => (
            <li><ItemContainer data={val} /></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TestingPageTemplate;
