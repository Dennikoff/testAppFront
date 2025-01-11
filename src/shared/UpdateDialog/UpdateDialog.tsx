import { Dialog } from "primereact/dialog";
import styles from "./UpdateDialog.module.scss";
import {
  Account,
  AccountDialogState,
  AccountForm,
} from "../../pages/AccountRegistration/types";
import { FormEvent, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "primereact/button";

interface Props {
  dialogState: AccountDialogState;
  account?: Account;
  setDialogState: (newValue: AccountDialogState) => void;
  onDelete: () => void;
  children: ReactNode;
}



export default function AccountDialog({
  dialogState,
  setDialogState,
  account,
  onDelete,
  children,
}: Props) {
  const [accountForm, setAccountForm] = useState<AccountForm>(
    dialogState.state === "edit" && account
      ? {
          login: account.login,
          name: account.name,
          role: account.role,
        }
      : { login: "", name: "", role: undefined }
  );

  useEffect(() => { 
    if (account) {
      setAccountForm({
        login: account.login,
        name: account.name,
        role: account.role,
      });
    }
  }, [account]);

  useEffect(() => {
    if (dialogState.state === "create") {
      setAccountForm({ login: "", name: "", role: undefined });
    }
  }, [dialogState.state]);

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
