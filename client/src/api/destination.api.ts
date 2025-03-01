import { Destination, Coordinates, ApiResponse } from "../types";
import { axiosInstance } from "./axios";

export const destinationApi = {
  getAllDestinations: async (): Promise<ApiResponse<Destination[]>> => {
    const response = await axiosInstance.get("/destinations");
    return response.data;
  },

  getDestination: async (id: string): Promise<ApiResponse<Destination>> => {
    const response = await axiosInstance.get(`/destinations/${id}`);
    return response.data;
  },

  checkDestination: async (
    coordinates: Coordinates & { destinationId: string }
  ): Promise<ApiResponse<{ found: boolean; distance: number }>> => {
    const response = await axiosInstance.post(
      "/destinations/check",
      coordinates
    );
    return response.data;
  },
};
