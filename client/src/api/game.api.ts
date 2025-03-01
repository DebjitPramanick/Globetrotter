import { Game, ApiResponse } from "../types";
import { axiosInstance } from "./axios";

export const gameApi = {
  startGame: async ({
    payload,
    options,
  }: {
    payload: { userId: string };
    options?: any;
  }): Promise<ApiResponse<Game>> => {
    return await axiosInstance.post("/games/start", payload, options);
  },

  getCurrentGame: async (): Promise<ApiResponse<Game>> => {
    return await axiosInstance.get("/games/current");
  },

  submitAnswer: async ({
    payload,
    options,
  }: {
    payload: { gameId: string; destinationId: string; answer: string };
    options?: any;
  }): Promise<ApiResponse<Game>> => {
    const body = {
      answer: payload.answer,
      destinationId: payload.destinationId,
    };

    return await axiosInstance.post(
      `/games/${payload.gameId}/answer`,
      body,
      options
    );
  },
};
