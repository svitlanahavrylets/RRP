import axios from "axios";
import { API_URL } from "../config.js";

export const fetchBlogData = async () => {
  try {
    const response = await axios.get(`${API_URL}/blog`);
    console.log("Отримані дані про команду:", response.data);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
  }
};

export const createBlogData = async (dataBlog) => {
  console.log("Функція createTeamData викликана з даними:", dataBlog);
  try {
    const response = await axios.post(`${API_URL}/blog`, dataBlog);
    console.log("Сервер відповів:", response.data);
  } catch (error) {
    console.error("Помилка при отриманні даних:", error.response.data);
  }
};

export const deleteBlogData = async (id) => {
  console.log(`Видаляємо картку з ID: ${id}`);
  try {
    const response = await axios.delete(`${API_URL}/blog/${id}`);
    console.log("Картку успішно видалено:", response.data);
  } catch (error) {
    console.error("Помилка при видаленні картки:", error.response.data);
  }
};
