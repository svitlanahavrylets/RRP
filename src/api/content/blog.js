import api from "../auth/auth.js"; // Імпортуємо api інстанс з auth.js
import { API_URL } from "../config.js";

export const fetchBlogData = async () => {
  try {
    const response = await api.get(`${API_URL}/blog`); // Використовуємо api інстанс
    console.log(response.data.posts);
    return response.data.posts;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
  }
};

export const fetchSingleBlog = async (id) => {
  try {
    const response = await api.get(`${API_URL}/blog/${id}`); // Використовуємо api інстанс
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні блогу:", error);
    return null;
  }
};

export const createBlogData = async (dataBlog) => {
  try {
    const response = await api.post(`${API_URL}/blog`, dataBlog); // Використовуємо api інстанс
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error.response?.data);
    return null;
  }
};

export const deleteBlogData = async (id) => {
  console.log(`Видаляємо картку з ID: ${id}`);
  try {
    const response = await api.delete(`${API_URL}/blog/${id}`); // Використовуємо api інстанс
    return response.data;
  } catch (error) {
    console.error("Помилка при видаленні картки:", error.response.data);
  }
};
