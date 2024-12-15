import { FormEvent, useCallback, useState } from "react";
import styles from "./Login.module.scss";
import Steve from "@/static/assets/steve.png";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { LoginForm } from "./types";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState<LoginForm>({
    login: "",
    password: "",
  });

  const formSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    console.log(loginForm);
    localStorage.setItem('jwt', `${loginForm.login}`);
    navigate('/');
  }, [loginForm]);

  return (
    <section id={styles.loginForm}>
      <div className={styles.formAndImage}>
        <div className={styles.formContainer}>
          <h1 className={styles.loginHeader}>Форма авторизации</h1>
          <form className={styles.form} onSubmit={formSubmit}>
            <FloatLabel>
              <InputText
                id="username"
                value={loginForm.login}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, login: e.target.value })
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
            <Button type="submit" className={styles.button} label="Войти" />
          </form>
        </div>
        <img className={styles.steve} src={Steve} />
      </div>
    </section>
  );
}
