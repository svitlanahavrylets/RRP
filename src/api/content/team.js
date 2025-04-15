import api from "../auth/auth.js";
import { API_URL } from "../config.js";

export const fetchTeamData = async () => {
  try {
    const response = await api.get(`${API_URL}/team`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při získávání dat týmu";
    throw new Error(errorMessage);
  }
};

export const createTeamData = async (dataTeam) => {
  try {
    const response = await api.post(`${API_URL}/team`, dataTeam);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při vytváření člena týmu";
    throw new Error(errorMessage);
  }
};

export const deleteTeamData = async (id) => {
  try {
    const response = await api.delete(`${API_URL}/team/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při mazání člena týmu";
    throw new Error(errorMessage);
  }
};
