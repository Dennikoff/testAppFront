import TestingPageTemplate from "@/shared/TestingPageTemplate/TestingPageTemplate";
import styles from "../../Testing.module.scss";
import { useCallback, useEffect, useState } from "react";
import { SearchOption } from "@/shared/TablePageTemplate/TablePageTemplate";
import { TestPlan, tmProject, tmTasks } from "@/types";
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
  fetchConnectedTestCases,
  fetchTestPlan,
  updateTestPlan,
} from "@/api/testPlan";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { fetchProjects } from "@/api/project";
import { fetchTmProjects, fetchTmTasks } from "@/api/taskManagement";

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

  const [projectOptionList, setProjectOptionList] = useState<ProjectOption[]>(
    []
  );
  const [tmProjectList, setTmProjectList] = useState<tmProject[]>([]);
  const [tmTaskList, setTmTaskList] = useState<tmTasks[]>([]);

  const [asuzProjectId, setAsuzProjectId] = useState<number>();

  const [searchOption, setSearchOption] = useState<SearchOption | null>(null);

  const [loading, setLoading] = useState(false);

  const [testPlanList, setTestPlanList] = useState<TestPlan[]>([]);

  const deleteItem = useCallback(async () => {
    deleteTestPlan(activeItem!.id).then(() => loadTestPlanData());
    setDialogState({ visible: false, state: "create" });
  }, [activeItem, testPlanList]);

  function loadTmTaskList(projectId: number) {
    fetchTmTasks(projectId).then((data) => setTmTaskList(data));
  }

  function loadTmProjectList() {
    fetchTmProjects().then((data) => setTmProjectList(data));
  }

  function loadProjectOptions() {
    fetchProjects().then((data) => setProjectOptionList(data));
  }

  async function loadTestPlanData() {
    setLoading(true);
    const testPlanList = await fetchTestPlan()
    for(let index in testPlanList) {
      const data = await fetchConnectedTestCases(testPlanList[index].id)
      const testCasesList = data.reduce((acc, value) => {
        return acc =  `${acc}${value.id} `;
      }, '')

      testPlanList[index].testCases = testCasesList;
    }
    setTestPlanList(testPlanList);
    setLoading(false);
  }

  useEffect(() => {
    if (asuzProjectId) {
      loadTmTaskList(asuzProjectId);
      if(dialogState.visible) {
        setItemForm({ ...itemForm, taskId: undefined })
      }
    }
  }, [asuzProjectId]);

  useEffect(() => {
    loadTestPlanData();
    loadProjectOptions();
    loadTmProjectList();
  }, []);

  useEffect(() => {
    setAsuzProjectId(undefined);
  }, [dialogState.visible])

  return (
    <div className={`page-container ${styles.page}`}>
      <TestingPageTemplate
        searchOption={searchOption}
        setSearchOption={setSearchOption}
        searchOptionList={searchOptionList}
        header="Управление тест-планами"
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
            taskId: data.taskId,
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
          <Dropdown
            value={asuzProjectId}
            optionLabel="title"
            optionValue="id"
            onChange={(e: DropdownChangeEvent) => setAsuzProjectId(e.value)}
            options={tmProjectList}
            placeholder="Выбор проект АСУЗ"
          />
          <Dropdown
            value={itemForm.taskId}
            disabled={!asuzProjectId}
            optionLabel="title"
            optionValue="id"
            onChange={(e: DropdownChangeEvent) =>
              setItemForm({ ...itemForm, taskId: e.value })
            }
            options={tmTaskList}
            placeholder="Выбор Задачи"
          />
        </div>
      </UpdateDialog>
    </div>
  );
}
