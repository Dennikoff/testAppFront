import styles from "../../Administration.module.scss";
import { Link } from "react-router-dom";

export default function Logs() {
  return (
    <div className={`page-container ${styles.page}`}>
      <h1>Страница в разработке</h1>
      <Link style={{ marginTop: "2rem", display: "block", color: "var(--color-main)" }} to={"/"}>
        <h3> Вернуться на главную</h3>
      </Link>
    </div>
  );
}
