export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  radius: number; // meters within which the destination is considered "found"
  points: number;
  image?: string;
}

export interface Game {
  id: string;
  userId: string;
  status: "active" | "completed";
  score: number;
  startTime: string;
  endTime?: string;
  timeSpent?: number; // in seconds
  destinationsFound: string[]; // array of destination IDs
}

export interface Stats {
  totalGames: number;
  totalScore: number;
  averageScore: number;
  bestScore: number;
  totalTimePlayed: number; // in seconds
  destinationsFound: number;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  score: number;
  rank: number;
}

export interface GameHistory {
  id: string;
  score: number;
  startTime: string;
  endTime: string;
  timeSpent: number;
  destinationsFound: Destination[];
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
