import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
  error?: string;
  statusCode?: number;
}

export const extractErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    // Handle Axios error response
    const errorData = error.response?.data as ErrorResponse | undefined;

    console.log(errorData);

    if (errorData?.message) {
      return errorData.message;
    }

    if (errorData?.error) {
      return errorData.error;
    }

    if (error.message) {
      return error.message;
    }
  }

  // Handle non-Axios errors
  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
};
