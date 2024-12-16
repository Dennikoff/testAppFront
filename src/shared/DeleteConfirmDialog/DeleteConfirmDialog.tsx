import { ConfirmDialog } from "primereact/confirmdialog";
import styles from "./DeleteConfirmDialog.module.scss";
import { Button } from "primereact/button";

export default function DeleteConfirmDialog() {
  return (
    <ConfirmDialog
      footer={({ accept, reject }) => (
        <div className={styles.confirmFooter}>
          <Button outlined label="Нет" onClick={reject} />
          <Button label="Да" onClick={accept} />
        </div>
      )}
    />
  );
}
