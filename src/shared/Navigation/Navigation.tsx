import { Link, useLocation } from "react-router-dom";
import img from "@/static/assets/logo.png";

import styles from "./Navigation.module.scss";
import { publicRoutePaths } from "@/router";

export default function Navigation() {
  const location = useLocation();
  const isPublicPage = publicRoutePaths.includes(location.pathname);


  const linkList = [
    {
      path: '/registration-acc',
      label: "Регистрация УЗ",
    },
    {
      path: '/administation',
      label: "Администрирование",
    },
    {
      path: '/testing',
      label: "Тестирование",
    },
  ]


  const navigationOnPublicPage = (
    <>
      <Link to={{ pathname: "/login" }}>
        <img src={img} width={50} height={50} />
      </Link>
    </>
  );

  const navigationOnPrivatePage = (
    <>
      <div className={styles.linksIconContainer}>
        <Link to={{ pathname: "/login" }}>
          <img src={img} width={50} height={50} />
        </Link>
        <ul className={styles.linksContainer}>
          {linkList.map((link) => {
            return <li><Link to={link.path}>{link.label}</Link></li>
          })}
        </ul>
      </div>
      <div>
        lol2
      </div>
    </>
  );

  return (
    <nav id={styles.navigation}>
      {isPublicPage ? navigationOnPublicPage : navigationOnPrivatePage}
    </nav>
  );
}
