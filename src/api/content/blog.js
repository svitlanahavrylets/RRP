import api from "../auth/auth.js";
import { API_URL } from "../config.js";

export const fetchBlogData = async () => {
  try {
    const response = await api.get(`${API_URL}/blog`);
    return response.data.posts;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při získávání dat blogu";
    throw new Error(errorMessage);
  }
};

export const fetchSingleBlog = async (id) => {
  try {
    const response = await api.get(`${API_URL}/blog/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při načítání příspěvku";
    throw new Error(errorMessage);
  }
};

export const createBlogData = async (dataBlog) => {
  try {
    const response = await api.post(`${API_URL}/blog`, dataBlog);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při vytváření příspěvku";
    throw new Error(errorMessage);
  }
};

export const deleteBlogData = async (id) => {
  try {
    const response = await api.delete(`${API_URL}/blog/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Chyba při mazání příspěvku";
    throw new Error(errorMessage);
  }
};
