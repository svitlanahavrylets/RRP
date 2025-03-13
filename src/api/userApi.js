import axios from "axios";

const API_URL = "https://nodefornewproject.onrender.com/api";

export const submitOrderData = async (orderData) => {
  try {
    const response = await axios.post(API_URL + "/test", orderData);
    return response.data;
  } catch (error) {
    console.error("Error submitting order data:", error);
    throw error;
  }
};
