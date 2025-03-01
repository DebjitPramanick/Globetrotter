import { Document, Types } from "mongoose";
import { Request, Response } from "express";

// MongoDB ObjectId type
export type ObjectId = Types.ObjectId;

// Base document interface for all models
interface BaseDocument extends Document {
  _id: ObjectId;
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

// Response types with string ID
interface BaseResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserResponse extends BaseResponse {
  username: string;
}

export interface IDestinationResponse extends BaseResponse {
  city: string;
  country: string;
  clues: string[];
  fun_fact: string[];
  trivia: string[];
}

// List response type for destinations
export interface IDestinationListResponse {
  id: string;
  city: string;
  clues: string[];
}

export interface IGame extends BaseDocument {
  username: string;
  correctAnswers: number;
  wrongAnswers: number;
  destinationIds: ObjectId[];
}

export interface IGameStats extends BaseDocument {
  username: string;
  bestScore: number;
  totalGamesPlayed: number;
  totalWrongAnswers: number;
  totalCorrectAnswers: number;
  nCorrectAnswersOnFirstClue: number;
  nWrongAnswersOnFirstClue: number;
  nCorrectAnswersOnMultipleClues: number;
  nWrongAnswersOnMultipleClues: number;
}
