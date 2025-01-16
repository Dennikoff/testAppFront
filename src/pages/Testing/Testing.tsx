import styles from "./Testing.module.scss"
import SidebarMenu from "@/shared/SidebarMenu/SidebarMenu";
import { Outlet } from "react-router-dom";

export default function Administration() {
  const sidebarLinkList = [
    {
      path: "project",
      label: "Проект",
    },
    {
      path: "test-plan",
      label: "Тест-план",
    },
    {
      path: "test-case",
      label: "Тест-кейс",
    },
  ];

  return (
    <div className={`page-wrapper ` + styles.testingPage}>
      <SidebarMenu linkList={sidebarLinkList} />
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}
