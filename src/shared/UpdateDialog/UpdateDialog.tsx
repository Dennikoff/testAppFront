import { Dialog } from "primereact/dialog";
import styles from "./UpdateDialog.module.scss";
import { FormEvent, ReactNode, useCallback, useMemo } from "react";
import { Button } from "primereact/button";
import { DialogState } from "./types";

interface Props {
  dialogState: DialogState;
  setDialogState: (newValue: DialogState) => void;
  onDelete: () => void;
  children: ReactNode;
}



export default function AccountDialog({
  dialogState,
  setDialogState,
  onDelete,
  children,
}: Props) {
  const formSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    setDialogState({ ...dialogState, visible: false });
  }, [dialogState]);

  

  const formControls = useMemo(() => {
    return (
      <>
        {dialogState.state === "edit" ? (
          <>
            <Button outlined severity="danger" label="Удалить" type="reset" onClick={onDelete}/>
            <Button label="Изменить" type="submit" />
          </>
        ) : (
          <Button label="Создать" type="submit" />
        )}
      </>
    );
  }, [dialogState.state]);

  return (
    <Dialog
      header={
        <h2>
          {dialogState.state === "create"
            ? "Создание записи"
            : "Изменение записи"}
        </h2>
      }
      visible={dialogState.visible}
      style={{ width: "50vw" }}
      onHide={() => {
        setDialogState({ ...dialogState, visible: false });
      }}
      contentClassName={styles.dialogContent}
      headerClassName={styles.dialogHeader}
    >
      <form className={styles.dialogForm} onSubmit={formSubmit}>
        {children}
        <div className={styles.formControls}>{formControls}</div>
      </form>
    </Dialog>
  );
}
