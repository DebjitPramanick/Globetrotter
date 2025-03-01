import { User, ApiResponse } from "../types";
import { axiosInstance } from "./axios";

export const userApi = {
  auth: async (userData: { username: string }): Promise<ApiResponse<User>> => {
    const response = await axiosInstance.post("/users/auth", userData);
    return response.data;
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    const response = await axiosInstance.get("/auth/current-user");
    return response.data;
  },
};
