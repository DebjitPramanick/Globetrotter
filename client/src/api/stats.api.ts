import { Stats, LeaderboardEntry, GameHistory, ApiResponse } from "../types";
import { axiosInstance } from "./axios";

export const statsApi = {
  getUserStats: async (): Promise<ApiResponse<Stats>> => {
    return await axiosInstance.get("/stats/user");
  },

  getLeaderboard: async (): Promise<ApiResponse<LeaderboardEntry[]>> => {
    return await axiosInstance.get("/stats/leaderboard");
  },

  getGameHistory: async (): Promise<ApiResponse<GameHistory[]>> => {
    return await axiosInstance.get("/stats/history");
  },
};
