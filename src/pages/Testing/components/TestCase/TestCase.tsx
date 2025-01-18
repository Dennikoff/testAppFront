import TestingPageTemplate from "@/shared/TestingPageTemplate/TestingPageTemplate";
import styles from "../../Testing.module.scss";
import { useCallback, useEffect, useState } from "react";
import { SearchOption } from "@/shared/TablePageTemplate/TablePageTemplate";
import { TestCase, TestPlan } from "@/types";
import UpdateDialog from "@/shared/UpdateDialog/UpdateDialog";
import { DialogState } from "@/shared/UpdateDialog/types";
import { confirmDialog } from "primereact/confirmdialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { DataWithName } from "@/shared/TestingPageTemplate/types";

import { TestCaseForm } from "../../types";
import {
  createTestCase,
  deleteTestCase,
  fetchConnectedSteps,
  fetchTestCase,
  updateTestCase,
} from "@/api/testCase";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { fetchTestPlan } from "@/api/testPlan";

export default function ProjectComponent() {
  const [search, setSearch] = useState<string>("");
  const [dialogState, setDialogState] = useState<DialogState>({
    visible: false,
    state: "create",
  });
  const [activeItem, setActiveItem] = useState<TestCase>();
  const [itemForm, setItemForm] = useState<TestCaseForm>({
    name: "",
    preCondition: "",
    postCondition: "",
  });
  const searchOptionList: SearchOption[] = [
    {
      label: "Поиск по названию",
      value: "name",
    },
  ];

  const [searchOption, setSearchOption] = useState<SearchOption | null>(null);

  const [loading, setLoading] = useState(false);

  const [testCaseList, setTestCaseList] = useState<TestCase[]>([]);

  const [testPlanList, setTestPlanList] = useState<TestPlan[]>([]);

  const deleteItem = useCallback(async () => {
    deleteTestCase(activeItem!.id).then(() => loadTestCaseData());
    setDialogState({ visible: false, state: "create" });
  }, [activeItem, testCaseList]);

  function loadTestPlanData() {
    fetchTestPlan().then((data) => setTestPlanList(data));
  }

  async function loadTestCaseData() {
    setLoading(true);
    const testCaseList = await fetchTestCase();
    for (let index in testCaseList) {
      const data = await fetchConnectedSteps(testCaseList[index].id);
			console.log(data);
      testCaseList[index].stepList = data;
    }
    setTestCaseList(testCaseList);
    setLoading(false);
  }

  useEffect(() => {
    loadTestPlanData();
    loadTestCaseData();
  }, []);



  return (
    <div className={`page-container ${styles.page}`}>
      <TestingPageTemplate
        searchOption={searchOption}
        setSearchOption={setSearchOption}
        searchOptionList={searchOptionList}
        header="Управление тест-кейсами"
        headerButton={{
          label: "Создать тест-кейс",
          action: () => {
            setItemForm({ name: "", preCondition: "", postCondition: "" });
            setDialogState({ visible: true, state: "create" });
          },
        }}
        loading={loading}
        searchValue={search}
        onSearchChange={setSearch}
        data={testCaseList}
        updateItem={(data: DataWithName) => {
          setActiveItem(data as TestCase);
          setItemForm({
            name: data.name,
            preCondition: data.preCondition,
            postCondition: data.postCondition,
            testPlanId: data.testPlanId,
          });
          setDialogState({ visible: true, state: "edit" });
        }}
        step
        load={loadTestCaseData}
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
          await createTestCase(itemForm);
          loadTestCaseData();
        }}
        onUpdate={async () => {
          console.log(itemForm);
          await updateTestCase(itemForm, activeItem!.id);
          loadTestCaseData();
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
            <label htmlFor="name">Имя тест-кейса</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              id="preCondition"
              value={itemForm.preCondition}
              onChange={(e) =>
                setItemForm({
                  ...itemForm,
                  preCondition: e.target.value,
                })
              }
            />
            <label htmlFor="preCondition">Предусловия</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              id="postCondition"
              value={itemForm.postCondition}
              onChange={(e) =>
                setItemForm({
                  ...itemForm,
                  postCondition: e.target.value,
                })
              }
            />
            <label htmlFor="postCondition">Постусловия</label>
          </FloatLabel>
          <Dropdown
            value={itemForm.testPlanId}
            optionLabel="name"
            optionValue="id"
            onChange={(e: DropdownChangeEvent) =>
              setItemForm({ ...itemForm, testPlanId: e.value })
            }
            options={testPlanList}
            placeholder="Выбор Задачи"
          />
        </div>
      </UpdateDialog>
    </div>
  );
}
