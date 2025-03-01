import { Game, GameStats } from "../models";
import { IGame, IGameStats } from "../types";
import mongoose from "mongoose";
import { ERROR_MESSAGES } from "../constants/errors";

// Game Helpers
export const createGameHelper = async (
  gameData: Partial<IGame>
): Promise<IGame> => {
  const game = new Game(gameData);
  return await game.save();
};

export const getGameHelper = async (id: string): Promise<IGame | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(ERROR_MESSAGES.SERVER.INVALID_ID);
  }
  return await Game.findById(id);
};

export const updateGameHelper = async (
  id: string,
  updateData: Partial<IGame>
): Promise<IGame | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(ERROR_MESSAGES.SERVER.INVALID_ID);
  }
  return await Game.findByIdAndUpdate(id, updateData, { new: true });
};

// GameStats Helpers
export const createGameStatsHelper = async (
  statsData: Partial<IGameStats>
): Promise<IGameStats> => {
  const stats = new GameStats(statsData);
  return await stats.save();
};

export const getGameStatsHelper = async (
  username: string
): Promise<IGameStats | null> => {
  return await GameStats.findOne({ username });
};

export const updateGameStatsHelper = async (
  username: string,
  updateData: Partial<IGameStats>
): Promise<IGameStats | null> => {
  return await GameStats.findOneAndUpdate({ username }, updateData, {
    new: true,
  });
};
