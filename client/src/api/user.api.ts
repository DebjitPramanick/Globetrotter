import { User, ApiResponse } from "../types";
import { axiosInstance } from "./axios";

export const userApi = {
  auth: async (userData: { username: string }): Promise<ApiResponse<User>> => {
    return await axiosInstance.post("/users/auth", userData);
  },

  logout: async (): Promise<ApiResponse<null>> => {
    return await axiosInstance.post("/auth/logout");
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    return await axiosInstance.get("/auth/current-user");
  },
};
