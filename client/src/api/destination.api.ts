import { Destination, ApiResponse } from "../types";
import { axiosInstance } from "./axios";

export const destinationApi = {
  getListOfDestinations: async ({
    options,
  }: {
    options?: any;
  } = {}): Promise<ApiResponse<Destination[]>> => {
    return await axiosInstance.get("/destinations/list", options);
  },

  getDestinationOptions: async ({
    id,
    options,
  }: {
    id: string;
    options?: any;
  }): Promise<ApiResponse<Destination[]>> => {
    return await axiosInstance.get(`/destinations/${id}/options`, options);
  },

  getNextClue: async ({
    payload,
    options,
  }: {
    payload: { id: string; currentClueIndex: number };
    options?: any;
  }): Promise<ApiResponse<{ clue: string; totalClues: number }>> => {
    return await axiosInstance.get(
      `/destinations/${payload.id}/clue?currentClueIndex=${payload.currentClueIndex}`,
      options
    );
  },
};
