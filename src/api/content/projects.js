import api from "../auth/auth.js"; // Імпортуємо api інстанс з auth.js
import { API_URL } from "../config.js";

export const fetchProjectsData = async () => {
  try {
    const response = await api.get(`${API_URL}/projects`); // Використовуємо api інстанс
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
  }
};

export const createProjectsData = async (dataProjects) => {
  console.log("Функція createProjectsData викликана з даними:", dataProjects);
  try {
    const response = await api.post(`${API_URL}/projects`, dataProjects); // Використовуємо api інстанс
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error.response.data);
  }
};

export const deleteProjectsData = async (id) => {
  console.log(`Видаляємо картку з ID: ${id}`);
  try {
    const response = await api.delete(`${API_URL}/projects/${id}`); // Використовуємо api інстанс
    return response.data;
  } catch (error) {
    console.error("Помилка при видаленні картки:", error.response.data);
  }
};
