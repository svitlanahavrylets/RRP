import axios from "axios";

import { API_URL } from "../config.js";

export const submitOrderData = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/test`, orderData);
    return response;
  } catch (error) {
    console.error("Error submitting order data:", error);
    throw error;
  }
};
