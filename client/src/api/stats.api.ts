import { Stats, ApiResponse } from "../types";
import { axiosInstance } from "./axios";

export const statsApi = {
  getUserStats: async (): Promise<ApiResponse<Stats>> => {
    return await axiosInstance.get("/stats");
  },
};
