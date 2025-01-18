import { LoginForm } from "@/pages/Login/types";
import { publicInstance } from ".";

export async function login(loginForm: LoginForm) {
  await publicInstance.post("/api/auth/login", loginForm).then((data) => {
    localStorage.setItem("role", data.data.role);
		localStorage.setItem("jwt", data.data.token);
  });
}
