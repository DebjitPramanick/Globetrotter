import { User, ApiResponse } from "../types";
import { axiosInstance } from "./axios";

export const userApi = {
  auth: async (userData: { username: string }): Promise<ApiResponse<User>> => {
    return await axiosInstance.post("/users/auth", userData);
  },

  getCurrentUser: async ({
    id,
    options,
  }: {
    id: string;
    options?: any;
  }): Promise<ApiResponse<User>> => {
    return await axiosInstance.get(`/users/${id}`, options);
  },
};
