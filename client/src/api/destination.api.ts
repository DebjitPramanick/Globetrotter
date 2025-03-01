import axios from "axios";
import { Destination, Coordinates, ApiResponse } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_APP_API_URL || "http://localhost:8080";

export const destinationApi = {
  getAllDestinations: async (): Promise<ApiResponse<Destination[]>> => {
    return await axios.get(`${BASE_URL}/destinations`);
  },

  getDestination: async (id: string): Promise<ApiResponse<Destination>> => {
    return await axios.get(`${BASE_URL}/destinations/${id}`);
  },

  checkDestination: async (
    coordinates: Coordinates & { destinationId: string }
  ): Promise<ApiResponse<{ found: boolean; distance: number }>> => {
    return await axios.post(`${BASE_URL}/destinations/check`, coordinates);
  },
};
