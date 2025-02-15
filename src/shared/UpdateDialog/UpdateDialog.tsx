import { Dialog } from "primereact/dialog";
import styles from "./UpdateDialog.module.scss";
import { FormEvent, ReactNode, useCallback, useMemo, useRef } from "react";
import { Button } from "primereact/button";
import { DialogState } from "./types";
import { Toast } from "primereact/toast";

interface Props {
  dialogState: DialogState;
  setDialogState: (newValue: DialogState) => void;
  onDelete: () => void;
  onCreate: () => Promise<void>;
  onUpdate: () => Promise<void>;
  children: ReactNode;
}

export default function AccountDialog({
  dialogState,
  setDialogState,
  onDelete,
  onCreate,
  onUpdate,
  children,
}: Props) {
  const toast = useRef<Toast>(null);

  const formSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if(dialogState.state === 'create') {
        onCreate()
        .then(() => setDialogState({ ...dialogState, visible: false }))
        .catch(() =>
          toast.current?.show({
            severity: "error",
            summary: "Ошибка",
            detail: "Произошла ошибка",
          })
        );
      } else {
        onUpdate()
        .then(() => setDialogState({ ...dialogState, visible: false }))
        .catch(() =>
          toast.current?.show({
            severity: "error",
            summary: "Ошибка",
            detail: "Произошла ошибка",
          })
        );
      }
      
    },
    [dialogState, onCreate, onUpdate]
  );

  const formControls = useMemo(() => {
    return (
      <>
        {dialogState.state === "edit" ? (
          <>
            <Button
              outlined
              severity="danger"
              label="Удалить"
              type="reset"
              onClick={onDelete}
            />
            <Button label="Изменить" type="submit" />
          </>
        ) : (
          <Button label="Создать" type="submit" />
        )}
      </>
    );
  }, [dialogState.state, onDelete]);

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
        <Toast ref={toast} />
        {children}
        <div className={styles.formControls}>{formControls}</div>
      </form>
    </Dialog>
  );
}
