export interface User {
  _id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface Destination {
  _id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  radius: number; // meters within which the destination is considered "found"
  points: number;
  clues: string[];
  totalClues: number;
  image?: string;
  options: string[];
  funFact: string;
}

export interface Game {
  _id: string;
  username: string;
  correctAnswers: number;
  wrongAnswers: number;
  destinationIds: string[];
  clueIndices: { [key: string]: number };
  score: number;
  maxScorePerDestination: number;
  isCompleted: boolean;
}

export interface Stats {
  totalGames: number;
  totalScore: number;
  averageScore: number;
  bestScore: number;
  totalTimePlayed: number; // in seconds
  destinationsFound: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface SubmissionResult {
  isCorrect: boolean;
  cluesUsed: number;
  score: number;
  totalScore: number;
  correctAnswer: string | undefined;
  isGameCompleted: boolean;
  correctAnswers: number;
  wrongAnswers: number;
  funFact: string;
}
