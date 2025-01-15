import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;



export const privateInstance = axios.create({
  baseURL: baseUrl,
});

privateInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config; 
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);


export const publicInstance = axios.create({
  baseURL: baseUrl,
});