import axios from "axios";
import { Game, ApiResponse } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_APP_API_URL || "http://localhost:8080";

export const gameApi = {
  startGame: async (): Promise<ApiResponse<Game>> => {
    return await axios.post(`${BASE_URL}/game/start`);
  },

  endGame: async (gameData: {
    score: number;
    timeSpent: number;
    destinationsFound: string[];
  }): Promise<ApiResponse<Game>> => {
    return await axios.post(`${BASE_URL}/game/end`, gameData);
  },

  getCurrentGame: async (): Promise<ApiResponse<Game>> => {
    return await axios.get(`${BASE_URL}/game/current`);
  },
};
