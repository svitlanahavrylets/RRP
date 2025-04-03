import axios from "axios";
import { API_URL } from "../config.js";

export const fetchBlogData = async () => {
  try {
    const response = await axios.get(`${API_URL}/blog`);
    console.log(response.data.posts);

    return response.data.posts;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
  }
};

export const fetchSingleBlog = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/blog/${id}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні блогу:", error);
    return null;
  }
};

export const createBlogData = async (dataBlog) => {
  try {
    const response = await axios.post(`${API_URL}/blog`, dataBlog);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error.response?.data);
    return null;
  }
};

export const deleteBlogData = async (id) => {
  console.log(`Видаляємо картку з ID: ${id}`);
  try {
    const response = await axios.delete(`${API_URL}/blog/${id}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при видаленні картки:", error.response.data);
  }
};
