import axios from "axios";
import { authHeader } from "@/utils";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

let cachedProfileData = null;

export const fetchProfileData = async () => {
  if (cachedProfileData) {
    return cachedProfileData;
  }

  try {
    const response = await axios.get(`${BACKEND_API_URL}/api/users/profile`, {
      headers: authHeader(),
    });
    cachedProfileData = response.data;
    return cachedProfileData;
  } catch (err) {
    throw new Error((err.response?.data?.message) || "Failed to fetch profile data");
  }
};
