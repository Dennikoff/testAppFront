import TestingPageTemplate from "@/shared/TestingPageTemplate/TestingPageTemplate";
import styles from "../../Testing.module.scss";
import { useEffect, useState } from "react";
import { SearchOption } from "@/shared/TablePageTemplate/TablePageTemplate";
import { TestPlan } from "@/types";
import { fetchTestPlan } from "@/api/testPlan";

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

  const [testPlanList, setTestPlanList] = useState<TestPlan[]>([]);

  function loadData() {
    setLoading(true);
    fetchTestPlan()
      .then((data) => setTestPlanList(data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={`page-container ${styles.page}`}>
      <TestingPageTemplate
        searchOption={searchOption}
        setSearchOption={setSearchOption}
        searchOptionList={searchOptionList}
        header="Управление тест-планом"
        headerButton={{
          label: "Создать тест-план",
          action: () => {
            console.log("create");
          },
        }}
				loading={loading}
        searchValue={search}
        onSearchChange={setSearch}
				data={testPlanList}
      />

    </div>
  );
}
