import TestingPageTemplate from "@/shared/TestingPageTemplate/TestingPageTemplate";
import styles from "../../Testing.module.scss";
import { useEffect, useState } from "react";
import { SearchOption } from "@/shared/TablePageTemplate/TablePageTemplate";
import { Project } from "@/types";
import { fetchProjects } from "@/api/project";

export default function ProjectComponent() {
  const [search, setSearch] = useState<string>("");
  const searchOptionList: SearchOption[] = [
    {
      label: "Поиск по названию",
      value: "name",
    },
  ];
  const [searchOption, setSearchOption] = useState<SearchOption | null>(null);

  const [loading, setLoading] = useState(false);

  const [projectList, setProjectList] = useState<Project[]>([]);

  function loadProjectList() {
    setLoading(true);
    fetchProjects()
      .then((data) => setProjectList(data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadProjectList();
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
            console.log("create");
          },
        }}
        searchValue={search}
        onSearchChange={setSearch}
				data={projectList}
      />

    </div>
  );
}
