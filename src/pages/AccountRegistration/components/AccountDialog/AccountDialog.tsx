import { Dialog } from "primereact/dialog";
import styles from "./AccountDialog.module.scss";
import {
  Account,
  AccountDialogState,
  AccountForm,
  AccountRole,
  AccountRoleLabels,
} from "../../types";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

interface Props {
  dialogState: AccountDialogState;
  account?: Account;
  setDialogState: (newValue: AccountDialogState) => void;
}

interface RoleOption {
  label: AccountRoleLabels;
  value: AccountRole;
}

export default function AccountDialog({
  dialogState,
  setDialogState,
  account,
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
    console.log(accountForm);
  }, [accountForm]);

  const roleOptions: RoleOption[] = [
    {
      label: "Тестировщик",
      value: "tester",
    },
    {
      label: "Тест-аналитик",
      value: "testAnalyst",
    },
    {
      label: "Администратор",
      value: "administrator",
    },
  ];

  const formControls = useMemo(() => {
    return (
      <>
        {dialogState.state === "edit" ? (
          <>
            <Button outlined severity="danger" label="Удалить" type="reset" />
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
        <div className={styles.formFields}>
          <FloatLabel>
            <InputText
              id="username"
              value={accountForm.login}
              onChange={(e) =>
                setAccountForm({ ...accountForm, login: e.target.value })
              }
            />
            <label htmlFor="username">Логин</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              id="name"
              value={accountForm.name}
              onChange={(e) =>
                setAccountForm({ ...accountForm, name: e.target.value })
              }
            />
            <label htmlFor="name">Имя</label>
          </FloatLabel>
          <Dropdown
            value={accountForm.role}
            onChange={(e: DropdownChangeEvent) =>
              setAccountForm({ ...accountForm, role: e.value })
            }
            options={roleOptions}
            placeholder="Роль"
          />
        </div>
        <div className={styles.formControls}>{formControls}</div>
      </form>
    </Dialog>
  );
}
