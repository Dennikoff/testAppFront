import { NavLink, useLocation } from "react-router-dom";
import img from "@/static/assets/logo.png";

import styles from "./Navigation.module.scss";
import { publicRoutePaths } from "@/router";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { SyntheticEvent, useCallback, useRef } from "react";

export default function Navigation() {
  const location = useLocation();
  const isPublicPage = publicRoutePaths.includes(location.pathname);

  const menuRight = useRef<Menu>(null);
  const items = [
    {
      label: "Управление",
      items: [
        {
          label: "Выйти",
          icon: "pi pi-sign-out",
          url: "/login",
          command: () => localStorage.removeItem("jwt"),
        },
      ],
    },
  ];

  const linkList = [
    {
      path: "/registration-acc",
      label: "Регистрация УЗ",
    },
    {
      path: "/administration",
      label: "Администрирование",
    },
    {
      path: "/testing",
      label: "Тестирование",
    },
  ];

  const navigationOnPublicPage = (
    <>
      <NavLink to={{ pathname: "/login" }}>
        <img src={img} width={50} height={50} />
      </NavLink>
    </>
  );

  const toggleMenu = useCallback((e: SyntheticEvent) => {
    menuRight.current?.toggle(e);
  }, []);

  const navigationOnPrivatePage = (
    <>
      <div className={styles.linksIconContainer}>
        <NavLink to={{ pathname: "/" }}>
          <img src={img} width={50} height={50} />
        </NavLink>
        <ul className={styles.linksContainer}>
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
      <div className={styles.userMenu} onClick={toggleMenu}>
        <Avatar icon="pi pi-user" className={styles.avatar} shape="circle" />
        <i className="pi pi-angle-down"></i>
      </div>
      <Menu
        model={items}
        popup
        ref={menuRight}
        id="popup_menu_right"
        popupAlignment="right"
      />
    </>
  );

  return (
    <nav id={styles.navigation}>
      {isPublicPage ? navigationOnPublicPage : navigationOnPrivatePage}
    </nav>
  );
}
