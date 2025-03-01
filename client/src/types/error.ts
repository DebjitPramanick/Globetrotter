export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export class RequestError extends Error {
  code?: string;
  status?: number;

  constructor(error: ApiError | Error | string | any) {
    if (typeof error === "string") {
      super(error);
    } else if (error instanceof Error) {
      super(error.message);
    } else {
      super(error.message);
      this.code = error.code;
      this.status = error.status;
    }
  }
}
