import axios from "axios";
import { User, ApiResponse } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_APP_API_URL || "http://localhost:8080";

export const userApi = {
  login: async (
    email: string,
    password: string
  ): Promise<ApiResponse<User>> => {
    return await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
  },

  register: async (userData: {
    email: string;
    password: string;
    username: string;
  }): Promise<ApiResponse<User>> => {
    return await axios.post(`${BASE_URL}/auth/register`, userData);
  },

  logout: async (): Promise<ApiResponse<null>> => {
    return await axios.post(`${BASE_URL}/auth/logout`);
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    return await axios.get(`${BASE_URL}/auth/current-user`);
  },
};
