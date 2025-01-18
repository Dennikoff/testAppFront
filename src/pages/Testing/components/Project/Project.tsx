import TestingPageTemplate from "@/shared/TestingPageTemplate/TestingPageTemplate";
import styles from "../../Testing.module.scss";
import { useCallback, useEffect, useState } from "react";
import { SearchOption } from "@/shared/TablePageTemplate/TablePageTemplate";
import { Project } from "@/types";
import {
  fetchProjects,
  deleteProject,
  createProject,
  updateProject,
} from "@/api/project";
import UpdateDialog from "@/shared/UpdateDialog/UpdateDialog";
import { DialogState } from "@/shared/UpdateDialog/types";
import { confirmDialog } from "primereact/confirmdialog";
import { ProjectForm } from "../../types";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { DataWithName } from "@/shared/TestingPageTemplate/types";

export default function ProjectComponent() {
  const [search, setSearch] = useState<string>("");
  const [dialogState, setDialogState] = useState<DialogState>({
    visible: false,
    state: "create",
  });
  const [activeItem, setActiveItem] = useState<Project>();
  const [itemForm, setItemForm] = useState<ProjectForm>({
    name: "",
  });
  const searchOptionList: SearchOption[] = [
    {
      label: "Поиск по названию",
      value: "name",
    },
  ];

  const [searchOption, setSearchOption] = useState<SearchOption | null>(null);

  const [loading, setLoading] = useState(false);

  const [projectList, setProjectList] = useState<Project[]>([]);

  const deleteItem = useCallback(async () => {
    deleteProject(activeItem!.id).then(() => loadProjectData());
    setDialogState({ visible: false, state: "create" });
  }, [activeItem, projectList]);

  function loadProjectData() {
    setLoading(true);
    fetchProjects()
      .then((data) => setProjectList(data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadProjectData();
  }, []);

  return (
    <div className={`page-container ${styles.page}`}>
      <TestingPageTemplate
        searchOption={searchOption}
        setSearchOption={setSearchOption}
        searchOptionList={searchOptionList}
        header="Управление проектами"
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
        data={projectList}
        updateItem={(data: DataWithName) => {
          setActiveItem(data as Project);
          setItemForm({ name: data.name });
          setDialogState({ visible: true, state: "edit" });
        }}
      />
      <UpdateDialog
        dialogState={dialogState}
        setDialogState={setDialogState}
        onDelete={() =>
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
          })
        }
        onCreate={async () => {
          await createProject(itemForm);
          loadProjectData();
        }}
        onUpdate={async () => {
          await updateProject(itemForm, activeItem!.id);
          loadProjectData();
        }}
      >
        <div className={styles.formFields}>
          <FloatLabel>
            <InputText
              id="name"
              value={itemForm.name}
              onChange={(e) =>
                setItemForm({
                  name: e.target.value,
                })
              }
            />
            <label htmlFor="name">Имя проекта</label>
          </FloatLabel>
        </div>
      </UpdateDialog>
    </div>
  );
}
