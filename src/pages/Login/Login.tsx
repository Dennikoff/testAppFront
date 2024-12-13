import { FormEvent, useCallback } from "react";
import styles from "./Login.module.scss";
import Steve from "@/static/assets/steve.png";
export default function Login() {
  const formSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    console.log("login");
  }, []);

  return (
    <section id={styles.loginForm}>
      <div className={styles.formContainer}>
        <h1 className={styles.loginHeader}>Форма авторизации</h1>
        <form onSubmit={formSubmit}>
        </form>
        <img className={styles.steve} src={Steve}  />
        
      </div>
    </section>
  );
}
