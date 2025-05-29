import api from "../auth/auth.js";
import { API_URL } from "../config.js";

export const fetchCareerPositions = async () => {
  try {
    const response = await api.get(`${API_URL}/careers`);
    console.log(response.data);

    return response.data.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při získávání pracovních pozic";
    throw new Error(errorMessage);
  }
};

export const fetchSingleCareerPosition = async (id) => {
  console.log(id);

  try {
    const response = await api.get(`${API_URL}/careers/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při načítání pracovní pozice";
    throw new Error(errorMessage);
  }
};

// Створити нову позицію
export const createCareerPosition = async (careerData) => {
  try {
    const response = await api.post(`${API_URL}/careers`, careerData);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při vytváření pracovní pozice";
    throw new Error(errorMessage);
  }
};

// Видалити позицію
export const deleteCareerPosition = async (id) => {
  try {
    const response = await api.delete(`${API_URL}/careers/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při mazání pracovní pozice";
    throw new Error(errorMessage);
  }
};
