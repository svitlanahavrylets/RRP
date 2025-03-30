import axios from "axios";
import { API_URL } from "../config.js";

export const fetchProjectsData = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
  }
};

export const createProjectsData = async (dataProjects) => {
  console.log("Функція createProjectsData викликана з даними:", dataProjects);
  try {
    const response = await axios.post(`${API_URL}/projects`, dataProjects);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error.response.data);
  }
};

export const deleteProjectsData = async (id) => {
  console.log(`Видаляємо картку з ID: ${id}`);
  try {
    const response = await axios.delete(`${API_URL}/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при видаленні картки:", error.response.data);
  }
};
