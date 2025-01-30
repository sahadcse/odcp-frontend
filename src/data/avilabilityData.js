import axios from "axios";
import { authHeader } from "@/utils";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

let cachedData = null;

export const AvilabilityData = async () => {
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${BACKEND_API_URL}/api/users/doctor/availability`, {
      headers: authHeader(),
    });
    cachedData = response.data;
    return cachedData;
  } catch (err) {
    throw new Error((err.response?.data?.message) || "Failed to fetch data");
  }
};
