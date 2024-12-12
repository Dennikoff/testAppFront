import { FormEvent, useCallback } from 'react';
import styles from './Login.module.scss';

export default function Login() {

  const formSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    console.log('login');
  }, [])

  return (
    <section id={styles.id}>
      <div className={styles.formContainer}>
        <form onSubmit={formSubmit}>
          <input type="text" />
        </form>
      </div>
    </section>
  );
}
