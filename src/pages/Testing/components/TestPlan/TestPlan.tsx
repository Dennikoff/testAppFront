import TestingPageTemplate from "@/shared/TestingPageTemplate/TestingPageTemplate";
import styles from "../../Testing.module.scss";
import { useCallback, useEffect, useState } from "react";
import { SearchOption } from "@/shared/TablePageTemplate/TablePageTemplate";
import { TestPlan } from "@/types";
import UpdateDialog from "@/shared/UpdateDialog/UpdateDialog";
import { DialogState } from "@/shared/UpdateDialog/types";
import { confirmDialog } from "primereact/confirmdialog";
import { ProjectOption, TestPlanForm } from "../../types";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { DataWithName } from "@/shared/TestingPageTemplate/types";
import {
  createTestPlan,
  deleteTestPlan,
  fetchTestPlan,
  updateTestPlan,
} from "@/api/testPlan";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { fetchProjects } from "@/api/project";

export default function ProjectComponent() {
  const [search, setSearch] = useState<string>("");
  const [dialogState, setDialogState] = useState<DialogState>({
    visible: false,
    state: "create",
  });
  const [activeItem, setActiveItem] = useState<TestPlan>();
  const [itemForm, setItemForm] = useState<TestPlanForm>({
    name: "",
  });
  const searchOptionList: SearchOption[] = [
    {
      label: "Поиск по названию",
      value: "name",
    },
  ];

  const [projectOptionList, setProjectOptionList] = useState<ProjectOption[]>([]);

  const [searchOption, setSearchOption] = useState<SearchOption | null>(null);

  const [loading, setLoading] = useState(false);

  const [testPlanList, setTestPlanList] = useState<TestPlan[]>([]);

  const deleteItem = useCallback(async () => {
    deleteTestPlan(activeItem!.id).then(() => loadTestPlanData());
    setDialogState({ visible: false, state: "create" });
  }, [activeItem, testPlanList]);

  function loadProjectOptions() {
    setLoading(true);
    fetchProjects()
      .then((data) => setProjectOptionList(data))
      .finally(() => setLoading(false));
  }

  function loadTestPlanData() {
    setLoading(true);
    fetchTestPlan()
      .then((data) => setTestPlanList(data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadTestPlanData();
    loadProjectOptions();
  }, []);

  return (
    <div className={`page-container ${styles.page}`}>
      <TestingPageTemplate
        searchOption={searchOption}
        setSearchOption={setSearchOption}
        searchOptionList={searchOptionList}
        header="Управление проектом"
        headerButton={{
          label: "Создать проект",
          action: () => {
            setItemForm({ name: "" });
            setDialogState({ visible: true, state: "create" });
          },
        }}
        loading={loading}
        searchValue={search}
        onSearchChange={setSearch}
        data={testPlanList}
        updateItem={(data: DataWithName) => {
          console.log(data);
          setActiveItem(data as TestPlan);
          setItemForm({
            name: data.name,
            taskKey: data.taskKey,
            projectId: data.projectId,
          });
          setDialogState({ visible: true, state: "edit" });
        }}
      />
      <UpdateDialog
        dialogState={dialogState}
        setDialogState={setDialogState}
        onDelete={() => {
          console.log(activeItem);
          confirmDialog({
            message: (
              <span>
                Вы действительно хотите удалить запись:
                <br />
                <b>Name: {activeItem?.name}</b>
              </span>
            ),
            header: "Подтверждение удаления",
            icon: "pi pi-info-circle",
            defaultFocus: "reject",
            acceptClassName: "p-button-danger",
            accept: deleteItem,
          });
        }}
        onCreate={async () => {
          await createTestPlan(itemForm);
          loadTestPlanData();
        }}
        onUpdate={async () => {
          await updateTestPlan(itemForm, activeItem!.id);
          loadTestPlanData();
        }}
      >
        <div className={styles.formFields}>
          <FloatLabel>
            <InputText
              id="name"
              value={itemForm.name}
              onChange={(e) =>
                setItemForm({
                  ...itemForm,
                  name: e.target.value,
                })
              }
            />
            <label htmlFor="name">Имя тест-плана</label>
          </FloatLabel>
          <Dropdown
            value={itemForm.projectId}
            optionLabel="name"
            optionValue="id"
            onChange={(e: DropdownChangeEvent) =>
              setItemForm({ ...itemForm, projectId: e.value })
            }
            options={projectOptionList}
            placeholder="Выбор проекта"
          />
        </div>
      </UpdateDialog>
    </div>
  );
}
