import axios from "axios";
import { API_URL } from "../config.js";

const api = axios.create({
  baseURL: API_URL,
});

// Функція для отримання токена
const getToken = () => localStorage.getItem("adminToken");

// Додавання токена у всі запити
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Перехоплення помилок 401 (неавторизовано)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin"; // Вихід та редірект на логін
    }
    return Promise.reject(error);
  }
);

export const loginAdmin = async (password) => {
  try {
    const response = await api.post("/login", { password });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error.response?.data?.message || "Chyba při přihlášení"; // Якщо є помилка від сервера, показуємо її
  }
};

export const checkAdminAuth = async () => {
  return api.get("/admin/protected"); // Запит для перевірки токена
};
