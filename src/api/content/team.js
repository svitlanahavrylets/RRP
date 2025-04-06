import api from "../auth/auth.js"; // Імпортуємо api інстанс з auth.js
import { API_URL } from "../config.js";

export const fetchTeamData = async () => {
  try {
    const response = await api.get(`${API_URL}/team`); // Використовуємо api інстанс
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
  }
};

export const createTeamData = async (dataTeam) => {
  try {
    const response = await api.post(`${API_URL}/team`, dataTeam); // Використовуємо api інстанс
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error.response.data);
  }
};

export const deleteTeamData = async (id) => {
  const token = localStorage.getItem("adminToken");
  console.log("token перед DELETE:", token); // ← додай це
  try {
    const response = await api.delete(`${API_URL}/team/${id}`); // Використовуємо api інстанс
    return response.data;
  } catch (error) {
    console.error("Помилка при видаленні картки:", error.response.data);
  }
};
