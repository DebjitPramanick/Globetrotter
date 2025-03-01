import axios from "axios";
import { Stats, LeaderboardEntry, GameHistory, ApiResponse } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_APP_API_URL || "http://localhost:8080";

export const statsApi = {
  getUserStats: async (): Promise<ApiResponse<Stats>> => {
    return await axios.get(`${BASE_URL}/stats/user`);
  },

  getLeaderboard: async (): Promise<ApiResponse<LeaderboardEntry[]>> => {
    return await axios.get(`${BASE_URL}/stats/leaderboard`);
  },

  getGameHistory: async (): Promise<ApiResponse<GameHistory[]>> => {
    return await axios.get(`${BASE_URL}/stats/history`);
  },
};
