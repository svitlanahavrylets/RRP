import api from "../auth/auth.js";
import { API_URL } from "../config.js";

export const fetchProjectsData = async () => {
  try {
    const response = await api.get(`${API_URL}/projects`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při získávání dat projektů";
    throw new Error(errorMessage);
  }
};

export const createProjectsData = async (dataProjects) => {
  try {
    const response = await api.post(`${API_URL}/projects`, dataProjects);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při vytváření projektu";
    throw new Error(errorMessage);
  }
};

export const deleteProjectsData = async (id) => {
  try {
    const response = await api.delete(`${API_URL}/projects/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při mazání projektu";
    throw new Error(errorMessage);
  }
};
