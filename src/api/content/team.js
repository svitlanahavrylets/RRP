import axios from "axios";
import { API_URL } from "../config.js";

export const fetchTeamData = async () => {
  try {
    const response = await axios.get(`${API_URL}/team`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
  }
};

export const createTeamData = async (dataTeam) => {
  try {
    const response = await axios.post(`${API_URL}/team`, dataTeam);

    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error.response.data);
  }
};

export const deleteTeamData = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/team/${id}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при видаленні картки:", error.response.data);
  }
};
