import { Stats, LeaderboardEntry, GameHistory, ApiResponse } from "../types";
import { axiosInstance } from "./axios";

export const statsApi = {
  getUserStats: async (): Promise<ApiResponse<Stats>> => {
    const response = await axiosInstance.get("/stats/user");
    return response.data;
  },

  getLeaderboard: async (): Promise<ApiResponse<LeaderboardEntry[]>> => {
    const response = await axiosInstance.get("/stats/leaderboard");
    return response.data;
  },

  getGameHistory: async (): Promise<ApiResponse<GameHistory[]>> => {
    const response = await axiosInstance.get("/stats/history");
    return response.data;
  },
};
