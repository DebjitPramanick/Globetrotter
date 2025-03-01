import { Game, ApiResponse } from "../types";
import { axiosInstance } from "./axios";

export const gameApi = {
  startGame: async (): Promise<ApiResponse<Game>> => {
    const response = await axiosInstance.post("/game/start");
    return response.data;
  },

  endGame: async (gameData: {
    score: number;
    timeSpent: number;
    destinationsFound: string[];
  }): Promise<ApiResponse<Game>> => {
    const response = await axiosInstance.post("/game/end", gameData);
    return response.data;
  },

  getCurrentGame: async (): Promise<ApiResponse<Game>> => {
    const response = await axiosInstance.get("/game/current");
    return response.data;
  },
};
