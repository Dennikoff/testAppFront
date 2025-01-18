import { FormEvent, useCallback, useRef, useState } from "react";
import styles from "./Login.module.scss";
import Steve from "@/static/assets/steve.png";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { LoginForm } from "./types";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { useNavigate } from "react-router-dom";
import { login } from "@/api/auth";
import { Toast } from "primereact/toast";
export default function Login() {
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const formSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      console.log(loginForm);
      login(loginForm).then(() => navigate(0)).catch(() => {
        toast.current?.show({ severity: 'error', summary: 'Ошибка', detail: 'Неверный логин или пароль' });
      });
    },
    [loginForm]
  );

  return (
    <section id={styles.loginForm}>
      <Toast ref={toast}/>
      <div className={styles.formAndImage}>
        <div className={styles.formContainer}>
          <h1 className={styles.loginHeader}>Форма авторизации</h1>
          <form className={styles.form} onSubmit={formSubmit}>
            <FloatLabel>
              <InputText
                id="username"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
              />
              <label htmlFor="username">Логин</label>
            </FloatLabel>
            <FloatLabel>
              <Password
                toggleMask
                feedback={false}
                id="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
              />
              <label htmlFor="password">Пароль</label>
            </FloatLabel>
            <Button
              type="submit"
              severity="secondary"
              className={styles.button}
              label="Войти"
            />
          </form>
        </div>
        <img className={styles.steve} src={Steve} />
      </div>
    </section>
  );
}
