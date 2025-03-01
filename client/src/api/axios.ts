import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_APP_API_URL || "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
