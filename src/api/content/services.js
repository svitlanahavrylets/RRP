import api from "../auth/auth.js";
import { API_URL } from "../config.js";

export const fetchServicesData = async () => {
  try {
    const response = await api.get(`${API_URL}/services`);

    return response.data.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při získávání dat služeb";
    throw new Error(errorMessage);
  }
};

export const fetchSingleService = async (id) => {
  console.log(id);

  try {
    const response = await api.get(`${API_URL}/services/${id}`);
    console.log(response.data);

    return response.data.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při načítání služby";
    throw new Error(errorMessage);
  }
};

export const createServicesData = async (dataServices) => {
  try {
    const response = await api.post(`${API_URL}/services`, dataServices);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při vytváření služby";
    throw new Error(errorMessage);
  }
};

export const deleteServicesData = async (id) => {
  try {
    const response = await api.delete(`${API_URL}/services/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při mazání služby";
    throw new Error(errorMessage);
  }
};
