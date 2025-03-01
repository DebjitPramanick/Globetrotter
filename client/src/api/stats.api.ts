import { Stats, ApiResponse } from "../types";
import { axiosInstance } from "./axios";

export const statsApi = {
  getUserStats: async ({
    userId,
    options,
  }: {
    userId: string;
    options?: any;
  }): Promise<ApiResponse<Stats>> => {
    return await axiosInstance.get(`/stats/${userId}`, options);
  },
};
