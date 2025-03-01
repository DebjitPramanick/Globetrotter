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
  funFact: string[];
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
  funFact: string[];
  trivia: string[];
}

// List response type for destinations
export interface IDestinationListResponse {
  id: string;
  city: string;
  firstClue: string;
  totalClues: number;
}

export interface IGame {
  _id: string;
  userId: string;
  correctAnswers: number;
  wrongAnswers: number;
  destinationIds: string[];
  clueIndices: { [key: string]: number };
  score: number;
  maxScorePerDestination: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGameStats {
  _id: string;
  userId: string;
  bestScore: number;
  totalCorrectAnswers: number;
  totalWrongAnswers: number;
  nCorrectAnswersOnFirstClue: number;
  nWrongAnswersOnFirstClue: number;
  nCorrectAnswersOnMultipleClues: number;
  nWrongAnswersOnMultipleClues: number;
  createdAt: Date;
  updatedAt: Date;
}
