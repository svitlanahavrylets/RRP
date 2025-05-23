import api from "../auth/auth.js";
import { API_URL } from "../config.js";

export const fetchAboutData = async () => {
  try {
    const response = await api.get(`${API_URL}/about`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při získávání dat";
    throw new Error(errorMessage);
  }
};

export const createAboutData = async (formData) => {
  try {
    const response = await api.patch(`${API_URL}/about`, formData);
    return response.data; // { updated: true } або { created: true }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při ukládání dat";
    throw new Error(errorMessage);
  }
};

export const deleteAboutData = async () => {
  try {
    const response = await api.delete(`${API_URL}/about`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při mazání sekce O nás";
    throw new Error(errorMessage);
  }
};
