import axios from "axios";
import { API_URL } from "../config.js";

export const fetchTeamData = async () => {
  try {
    const response = await axios.get(`${API_URL}/team`);
    console.log("Отримані дані про команду:", response.data);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
  }
};

export const createTeamData = async (dataTeam) => {
  console.log("Функція createTeamData викликана з даними:", dataTeam);
  try {
    const response = await axios.post(`${API_URL}/team`, dataTeam);
    console.log("Сервер відповів:", response.data);
  } catch (error) {
    console.error("Помилка при отриманні даних:", error.response.data);
  }
};
