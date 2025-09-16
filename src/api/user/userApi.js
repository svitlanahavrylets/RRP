import axios from "axios";

import { API_URL } from "../config.js";

export const submitOrderData = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/test`, orderData);
    return response;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Došlo k chybě při odesílání objednávky. Zkuste to prosím znovu.";
    throw new Error(errorMessage);
  }
};
