import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const instance = axios.create({
  baseURL: baseUrl,
});

export const getAuth = async () => {
  instance.post("/api/auth/login", {
    username: "string",
    password: "string",
  });
  instance.post("/api/auth/logout");
};
