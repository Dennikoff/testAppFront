import styles from "./Administration.module.scss";
import SidebarMenu from "@/shared/SidebarMenu/SidebarMenu";
import { Outlet } from "react-router-dom";

export default function Administration() {
  const sidebarLinkList = [
    {
      path: "asuz-control",
      label: "Управление АСУЗ",
    },
    {
      path: "logs",
      label: "Просмотр логов",
    },
  ];

  return (
    <div className={`page-wrapper ` + styles.administrationPage}>
      <SidebarMenu linkList={sidebarLinkList} />
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}
