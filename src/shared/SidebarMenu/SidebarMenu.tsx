import styles from "./SidebarMenu.module.scss";
import { NavLink } from "react-router-dom";

interface Props {
  linkList: { path: string; label: string }[];
}

export default function SidebarMenu({linkList}: Props) {

  return (
    <div className={`page-container ${styles.sidebarMenu}`}>
      <ul className={styles.linkList}>
        {linkList.map((link) => {
          return (
            <li key={link.path}>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? styles.active + " " : ""}${styles.navLink}`
                }
                to={link.path}
              >
                {link.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
