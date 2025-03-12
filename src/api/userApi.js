import axios from "axios";

const API_URL = "https://your-backend-api-endpoint.com";

export const submitOrderData = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/order`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error submitting order data:", error);
    throw error; // Можна кинути помилку для подальшої обробки в компоненті
  }
};
