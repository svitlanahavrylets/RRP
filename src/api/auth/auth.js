import axios from "axios";
import { API_URL } from "../config.js";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // для refreshToken в cookie
});

const getToken = () => localStorage.getItem("adminToken");

// 👉 Додаємо токен до кожного запиту
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("🔐 Додаємо токен:", config.headers.Authorization);
  }
  return config;
});

// 👉 Відловлюємо 401 і пробуємо оновити токен
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Якщо неавторизований і ще не пробували рефреш
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/admin/refresh") // <--- ось додаткова перевірка
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${API_URL}/admin/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = res.data?.token;
        if (!newToken) {
          throw new Error("Новий токен не отримано");
        }
        localStorage.setItem("adminToken", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        // ❌ Не вдалося оновити токен — чистимо та редірект
        localStorage.removeItem("adminToken");
        window.location.replace("/admin");

        return Promise.reject({ ...refreshError, refreshFailed: true });
      }
    }

    return Promise.reject(error);
  }
);

// 🔑 Вхід адміністратора
export const loginAdmin = async (password) => {
  try {
    const response = await api.post("/admin/login", { password });
    localStorage.setItem("adminToken", response.data.token);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při přihlášení";
    throw new Error(errorMessage);
  }
};

// 🔐 Перевірка доступу до захищеного ресурсу
export const checkAdminAuth = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found, please login");
  }

  const res = await api.get("/admin/protected");
  return res.data;
};

export default api;
