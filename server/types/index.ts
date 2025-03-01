import { Document } from "mongoose";
import { Request, Response } from "express";

// Base document interface for all models
interface BaseDocument extends Document {
  createdAt: Date;
  updatedAt: Date;
}

// User types
export interface IUser extends BaseDocument {
  username: string;
}

// Destination types
export interface IDestination extends BaseDocument {
  city: string;
  country: string;
  clues: string[];
  fun_fact: string[];
  trivia: string[];
}

// Controller types
export interface IController {
  (req: Request, res: Response): Promise<void>;
}

// Error response type
export interface IErrorResponse {
  error: string;
}

// Success response types
export interface IUserResponse extends Omit<IUser, keyof BaseDocument> {
  id: string;
}

export interface IDestinationResponse
  extends Omit<IDestination, keyof BaseDocument> {
  id: string;
}
